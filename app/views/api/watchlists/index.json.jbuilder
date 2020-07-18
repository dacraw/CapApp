@watchlists.each do |watchlist|
    

        json.partial! 'watchlist', watchlist: watchlist
        json.set! watchlist.id do
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