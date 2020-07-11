stock = @watched_stock.stock
json.set! @watched_stock.watchlist_id do
    json.watchedStocks do
        json.set! @watched_stock.id do
            json.extract! @watched_stock, :id, :stock_id, :watchlist_id
            json.symbol @watched_stock.stock.symbol
        end
    end
end