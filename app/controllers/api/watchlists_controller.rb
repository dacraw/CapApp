class Api::WatchlistsController < ApplicationController
    # business news
    def index
        @watchlists = Watchlist.where(user_id: 1)
        render :index
    end
    def create

    end
    def watchlist_params
        params.require(:watchlist).permit(:user_id, :title)
    end
end