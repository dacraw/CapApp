class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        @user.cash_available = 10000.00
        
        if @user.save
            
            Portfolio.create({user_id: @user.id, symbol: 'AAPL', num_shares: 0, stock_price: 0 })
            
            login(@user)
            render :create
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def user_params
        params.require(:user).permit(:username, :password, :fname, :lname, :cash_available)
    end
end
