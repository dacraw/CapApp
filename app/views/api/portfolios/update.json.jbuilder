json.set! @portfolio.user_id do
    # update cash available
    json.cashAvailable number_to_currency(User.find(@portfolio.user_id).cash_available.to_f)
    # debugger
    # update num shares in owned stocks
    json.ownedStocks do
        json.set! @portfolio.symbol do
            # debugger
            json.extract! @portfolio, :symbol, :num_shares
        end
    end
    json.newShares @new_shares
end
