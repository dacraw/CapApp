json.set! @portfolio.user_id do
    # update cash available
    json.cashAvailable User.find(@portfolio.user_id).cash_available.to_f
    #debugger
    # update num shares in owned stocks
    json.ownedStocks do
        json.set! @portfolio.symbol do
            json.extract! @portfolio, :symbol, :num_shares
        end
    end
end