class Api::PortfoliosController < ApplicationController
    def index
        @portfolio = Portfolio.where(user_id: params[:user_id])
        # debugger
        if @portfolio
            render :index
        else
            render json: @user_stocks.errors.full_messages
        end
    end
  
    def create
        @portfolio = Portfolio.new(portfolio_params)
        
        if @portfolio.user_id == current_user.id
            if @portfolio.save!
                render :create
            else
                render json: @portfolio.errors.full_messages, status: 422
            end
        else
            render json: ["You are not authorized to do this."], status: 422
        end
    end

    def portfolio_params
        params.require(:portfolio).permit(:user_id, :symbol, :num_shares)
    end
end