class Api::SessionsController < ApplicationController
    def create
        @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
        if @user
            # debugger
            login(@user)
            render 'api/users/create';
        else
            render json: ['Unable to log in with provided credentials.'], status: 422
        end
    end

    def destroy
        logout!
    end
end
