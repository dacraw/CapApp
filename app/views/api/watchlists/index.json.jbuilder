@watchlists.each do |watchlist|
    # debugger
    json.set! watchlist.id do
        json.partial! 'watchlist', watchlist: watchlist
        json.watchedStocks do
            if (!watchlist.watched_stocks.length)             
                {
                    id: null
                }
            else 
                watchlist.watched_stocks.each do |watched_stock|
                    json.set! watched_stock.id do
                        json.extract! watched_stock, :id, :stock_id, :watchlist_id
                        json.symbol watched_stock.stock.symbol
                    end
                end
            end
        end
    end
end