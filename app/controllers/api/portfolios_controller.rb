class Api::PortfoliosController < ApplicationController
    def index
        @portfolio = Portfolio.where(user_id: params[:user_id])
        
        if @portfolio
            render :index
        else
            render json: @user_stocks.errors.full_messages
        end
    end

    def create
        # this is for when the user buys a stock for the first time
        
        @portfolio = Portfolio.new(portfolio_params)
        cash_available = User.find(portfolio_params[:user_id]).cash_available
        if cash_available >= portfolio_params[:stock_price].to_i
            if @portfolio.save!
                render :update
            else
                render json: @portfolio.errors.full_messages, status: 422
            end
        else
            render json: ['Sorry, not enough available cash.'], status: 422
        end
    end
  
    def update
        # Check if user already owns the share.
        @portfolio = Portfolio.find_by(user_id: portfolio_params[:user_id], symbol: portfolio_params[:symbol].upcase)
        user_id = portfolio_params[:user_id].to_i
        num_shares = portfolio_params[:num_shares].to_i
        stock_price = portfolio_params[:stock_price].to_i
        
        if @portfolio
            current_shares = @portfolio.num_shares
            updated_shares = current_shares + num_shares
            cash_available = User.find(user_id).cash_available
            
            # If user already owns the stock and wants to buy more shares
            if num_shares > 0 && cash_available >= stock_price
                if @portfolio.update!(num_shares: updated_shares)
                    # update user's cash_available
                    current_cash = User.find(@portfolio.user_id).cash_available
                    total_cost = num_shares * stock_price
                    updated_cash = current_cash - total_cost
                    User.find(@portfolio.user_id).update(cash_available: updated_cash)

                    render :update
                else
                    render json: ['Sorry, something went wrong.'], status: 422
                end
            elsif num_shares < 0 && num_shares * 1 > @portfolio.num_shares
                if @portfolio.update!(num_shares: updated_shares)
                    # update user's cash_available
                    current_cash = User.find(@portfolio.user_id).cash_available
                    total_cost = num_shares * stock_price
                    updated_cash = current_cash + total_cost
                    User.find(@portfolio.user_id).update(cash_available: updated_cash)
                    render :update
                else
                    render json: ['Sorry, something went wrong.'], status: 422
                end	
            else
                render json: ["Sorry, you either don't own any shares of this stock or don't have enough money to buy more."], status: 422
            end
        end
    end

    def portfolio_params
        params.require(:portfolio).permit(:user_id, :symbol, :num_shares, :stock_price)
    end
end