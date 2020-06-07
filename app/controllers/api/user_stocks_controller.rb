class Api::UserStocksController < ApplicationController
    def index
        @user_stocks = User.find(current_user.id).portfolio.user_stocks
        render :index
    end
    
    def create
        @user_stock = UserStock.new(user_stocks_params)
        @user_stock.portfolio_id = User.find(current_user.id).portfolio.id
        @user_stock
        if @user_stock.save!
            render :create
        else
            render json: @user_stock.errors.full_messages, status: 422
        end
    end

    def user_stocks_params
        params.require(:user_stock).permit(:portfolio_id, :stock_id, :num_shares)
    end
end