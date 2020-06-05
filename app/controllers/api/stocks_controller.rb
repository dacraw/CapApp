class Api::StocksController < ApplicationController
    def show
        @stock = Stock.find_by(symbol: params[:symbol].upcase) # to upcase ; db is case sensitive
        debugger
        if @stock
            render :show
        else
            render json: @stock.errors.full_messages, status: 422
        end
    end
end