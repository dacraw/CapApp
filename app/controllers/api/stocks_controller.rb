class Api::StocksController < ApplicationController
    def show
        @stock = Stock.find(params[:id])
        if @stock
            render :show
        else
            render json: @stock.errors.full_messages, status: 422
        end
    end
end