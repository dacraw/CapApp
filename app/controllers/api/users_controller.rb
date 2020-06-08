class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        @user.cash_available = 10000.00
        if @user.save
            # debugger
            
            login(@user)
            #render json: @user
            render :create
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def user_params
        params.require(:user).permit(:username, :password, :fname, :lname, :cash_available)
    end
end
