class Api::WatchlistsController < ApplicationController
    # business news
    def index
        @watchlists = Watchlist.where(user_id: current_user)
        render :index
    end

    def create
        @watchlist = Watchlist.new(watchlist_params)
        @watchlist.user_id = current_user.id
        # debugger
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