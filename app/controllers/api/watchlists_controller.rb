class Api::WatchlistsController < ApplicationController
    # business news
    def index
        @watchlists = Watchlist.where(user_id: 1)
        render :index
    end

    def create
        @watchlist = Watchlist.new(watchlist_params)
        if @watchlist.save!
            render :create
        else
            render json: @watchlist.errors.full_messages, status: 422
        end
    end

    def watchlist_params
        params.require(:watchlist).permit(:user_id, :title)
    end
end