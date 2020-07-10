class WatchedStocksController < ApplicationController
    def create
        @watched_stock = WatchedStock.new(watched_stock_params)
        if @watched_stock.save
            render :default
        else
            render json: @watched_stock.errors.full_messages, status: 422
        end
    end


    def watched_stock_params
        params.require(:watched_stock).permit(:stock_id, :watchlist_id)
    end
end