class Api::PortfoliosController < ApplicationController
    def index
        @portfolio = Portfolio.where(user_id: params[:user_id])
        #debugger
        # if @portfolio.length != 0
            render :index
        #else
            # render json: ["User currently has no portfolios"]
        #end
    end

    def create
        # this is for when the user buys a stock for the first time
        @portfolio = Portfolio.new(portfolio_params)
        
        cash_available = User.find(portfolio_params[:user_id]).cash_available
        stock_price = portfolio_params[:stock_price].to_f.round(2)
        @num_shares = (portfolio_params[:formType] == 'sell') ? portfolio_params[:num_shares].to_f * -1 : portfolio_params[:num_shares].to_f
        total_cost = @num_shares * stock_price
        @form_type = portfolio_params[:formType]
        
        if cash_available >= total_cost
            if @portfolio.save
                current_cash = User.find(@portfolio.user_id).cash_available
                updated_cash = current_cash - total_cost
                User.find(@portfolio.user_id).update(cash_available: updated_cash.round(2))
                render :update
            else
                render json: @portfolio.errors.full_messages, status: 422
            end
        end
       
        #@portfolio = Portfolio.new(portfolio_params)
        # user_id = portfolio_params[:user_id].to_i
        # num_shares = portfolio_params[:num_shares].to_f
        # @new_shares = num_shares
        # @form_type = portfolio_params[:formType]
        # stock_price = portfolio_params[:stock_price].to_f.round(2)
        # cash_available = User.find(portfolio_params[:user_id]).cash_available

        # if cash_available >= portfolio_params[:stock_price].to_f.round(2)
        #     if @portfolio.save!
        #         current_cash = User.find(@portfolio.user_id).cash_available
        #         total_cost = num_shares * stock_price
        #         updated_cash = current_cash - total_cost
                
        #         User.find(@portfolio.user_id).update(cash_available: updated_cash.round(2))
        #         render :update
        #     else
        #         render json: @portfolio.errors.full_messages, status: 422
        #     end
        # else
        #     render json: ['Sorry, not enough available cash.'], status: 422
        # end
    end
  
    def update
        # Check if user already owns the share.
        @portfolio = Portfolio.find_by(user_id: portfolio_params[:user_id], symbol: portfolio_params[:symbol].upcase)
        user_id = portfolio_params[:user_id].to_i
        num_shares = portfolio_params[:num_shares].to_f
        @new_shares = num_shares
        @form_type = portfolio_params[:formType]
        stock_price = portfolio_params[:stock_price].to_f.round(2)
        
        if @portfolio
            current_shares = @portfolio.num_shares
            updated_shares = current_shares + num_shares
            cash_available = User.find(user_id).cash_available
            
            # If user already owns the stock and wants to buy more shares
            if portfolio_params[:formType] == 'buy' && num_shares > 0 && cash_available >= stock_price * num_shares
                if @portfolio.update!(num_shares: updated_shares)
                    # update user's cash_available
                    current_cash = User.find(@portfolio.user_id).cash_available
                    total_cost = num_shares * stock_price
                    updated_cash = current_cash - total_cost
                    User.find(@portfolio.user_id).update(cash_available: updated_cash.round(2))

                    render :update
                else
                    render json: ['Sorry, something went wrong.'], status: 422
                end
            elsif portfolio_params[:formType] == 'sell' && @portfolio.num_shares >= num_shares
                
                # user sells stock
                updated_shares = current_shares - num_shares
                if @portfolio.update!(num_shares: updated_shares.round(2))
                    # update user's cash_available
                    current_cash = User.find(@portfolio.user_id).cash_available
                    total_cost = -num_shares * stock_price
                    updated_cash = current_cash - total_cost
                    User.find(@portfolio.user_id).update(cash_available: updated_cash.round(2))

                    # reduce user shares
                    
                    render :update
                else
                    render json: ['Sorry, something went wrong.'], status: 422
                end	
            else
                render json: ["Sorry, you don't have enough money to buy more."], status: 422
            end
        end
    end

    def portfolio_params
        params.require(:portfolio).permit(:user_id, :symbol, :num_shares, :stock_price, :formType)
    end
end