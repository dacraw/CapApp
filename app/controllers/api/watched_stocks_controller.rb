class Api::WatchedStocksController < ApplicationController
    def create
        @watched_stock = WatchedStock.new(watched_stock_params)
        if @watched_stock.save
            render :default
        else
            render json: @watched_stock.errors.full_messages, status: 422
        end
    end

    def destroy
        @watched_stock = WatchedStock.find(params[:id])
        if @watched_stock.destroy
            render json: ["success"]
        else
            render json: @watched_stock.errors.full_messages, status: 422
        end
    end


    def watched_stock_params
        params.require(:watched_stock).permit(:stock_id, :watchlist_id)
    end
end