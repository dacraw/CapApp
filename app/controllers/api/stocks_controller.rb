class Api::StocksController < ApplicationController
    def show
        # debugger
        @stock = Stock.find_by(symbol: params[:symbol].upcase) # to upcase ; db is case sensitive
        if @stock
            render :show
        else
            render json: @stock.errors.full_messages, status: 422
        end
    end

    def index
        @stocks = Stock.all
        render :index
    end
end