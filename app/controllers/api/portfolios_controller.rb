class Api::PortfoliosController < ApplicationController
    def index
        @portfolio = Portfolio.find_by(user_id: params[:user_id])
        if @portfolio
            render :index
        else
            render json: @portfolio.errors.full_messages, status: 422
        end
    end

    def portfolio_params
        params.require(:portfolio).permit(:user_id, :cash_available)
    end
end