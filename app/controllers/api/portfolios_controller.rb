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
        @portfolio = Portfolio.new(user_stocks_params)
        @portfolio.portfolio_id = User.find(current_user.id).portfolio.id
        if @portfolio.save!
            render :create
        else
            render json: @portfolio.errors.full_messages, status: 422
        end
    end

    # def user_stocks_params
    #     params.require(:user_stock).permit(:portfolio_id, :stock_id, :num_shares)
    # end
end