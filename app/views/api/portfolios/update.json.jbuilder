json.set! @portfolio.user_id do
    json.ownedStocks do
        json.set! @portfolio.symbol do
            json.extract! @portfolio, :symbol, :num_shares
        end
    end
end