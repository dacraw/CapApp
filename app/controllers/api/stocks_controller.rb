class Api::StocksController < ApplicationController
    def show
        
        @stock = Stock.find_by(symbol: params[:symbol].upcase) # to upcase ; db is case sensitive
        if @stock
            render :show
        else
            render json: @stock.errors.full_messages, status: 422
        end
    end

    def index
        # byebug
        # @stocks = Stock.find_by_symbol()
        @stocks = Stock.where(symbol: ['META', "MSFT", "AAPL", "GOOG"])
        render :index
    end
end