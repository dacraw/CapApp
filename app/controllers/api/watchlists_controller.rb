class Api::WatchlistsController < ApplicationController
    # business news
    def index
        watchlists = Watchlists.where(user: current_user)
        render :index
    end
end