class Api::PortfoliosController < ApplicationController
    def index
        @portfolio = Portfolio.where(user_id: params[:user_id])

        render :index
    end

    def create
        @portfolio = Portfolio.new(portfolio_params)
        cash_available = User.find(portfolio_params[:user_id]).cash_available
        stock_price = portfolio_params[:stock_price].to_f.round(2)
        @portfolio.num_shares = (portfolio_params[:formType] == 'sell') ? portfolio_params[:num_shares].to_f * -1 : portfolio_params[:num_shares].to_f
        total_cost = @portfolio.num_shares * stock_price
        @form_type = portfolio_params[:formType]
        
        if cash_available >= total_cost
            if @portfolio.save
                current_cash = User.find(@portfolio.user_id).cash_available
                updated_cash = current_cash - total_cost
                User.find(@portfolio.user_id).update(cash_available: updated_cash.round(2))
                render :create
            else
                render json: @portfolio.errors.full_messages, status: 422
            end
        end
    end

    def portfolio_params
        params.require(:portfolio).permit(:user_id, :symbol, :num_shares, :stock_price, :formType)
    end
end