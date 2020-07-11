stock = @watched_stock.stock
json.set! @watched_stock.watchlist_id do
    json.watchedStocks stock
end