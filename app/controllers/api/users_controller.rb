class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        if @user.save
            # debugger
            # auto create portfolio for the user and add 10,000
            Portfolio.create!({user_id: @user.id, cash_available: 10000.00})
            login(@user)
            #render json: @user
            render 'api/users/user';
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def user_params
        params.require(:user).permit(:username, :password, :fname, :lname)
    end
end
