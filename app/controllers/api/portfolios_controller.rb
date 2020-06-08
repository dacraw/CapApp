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
        if cash_available >= portfolio_params[:stock_price]
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
        @portfolio = Portfolio.find_by(user_id: portfolio_params[:user_id], symbol: portfolio_params[:symbol])
        if @portfolio
            current_shares = @portfolio.num_shares
            new_shares = portfolio_params[:num_shares]
            updated_shares = current_shares + new_shares
            
            # If user already owns the stock and wants to buy more shares
            if portfolio_params[:num_shares] > 0 && cash_available >= portfolio_params[:stock_price]
                if @portfolio.update!(num_shares: updated_shares)
                    # update user's cash_available
                    current_cash = User.find(@portfolio.user_id).cash_available
                    total_cost = portfolio_params[:num_shares] * portfolio_params[:stock_price]
                    updated_cash = current_cash - total_cost
                    User.find(@portfolio.user_id).update(cash_available: updated_cash)

                    render :update
                else
                    render json: ['Sorry, something went wrong.'], status: 422
                end
            end

            # If user wants to sell shares and has enough
            if portfolio_params[:num_shares] < 0 && portfolio_params[:num_shares] * 1 > @portfolio.num_shares
                if @portfolio.update!(num_shares: updated_shares)
                    # update user's cash_available
                    current_cash = User.find(@portfolio.user_id).cash_available
                    total_cost = portfolio_params[:num_shares] * portfolio_params[:stock_price]
                    updated_cash = current_cash + total_cost
                    User.find(@portfolio.user_id).update(cash_available: updated_cash)
                    render :update
                else
                    render json: ['Sorry, something went wrong.'], status: 422
                end	
            else
                render json: ["Sorry, you can't sell these shares because you don't own this stock or don't have enough shares to sell."]
            end
        end
    end

    def portfolio_params
        params.require(:portfolio).permit(:user_id, :symbol, :num_shares, :stock_price)
    end
end