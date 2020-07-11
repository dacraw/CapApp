stock = @watched_stock.stock
json.set! @watched_stock.watchlist_id do
    json.watchedStocks do
        json.stock stock
    end
end