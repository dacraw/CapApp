class Api::PortfoliosController < ApplicationController
    def create
        @portfolio = Portfolio.new(portfolio_params)
        @portfolio.user_id = current_user.id
        # default 10,000 for demo purposes
        @portfolio.cash_available = 10000.00
        if @portfolio.save
            render json: @portfolio
        else
            render json: @portfolio.errors.full_messages, status: 422
        end
    end

    def portfolio_params
        params.require(:portfolio).permit(:user_id, :cash_available)
    end
end