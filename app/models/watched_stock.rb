class WatchedStock < ApplicationRecord
    belongs_to :watchlist
    belongs_to :stock
end
