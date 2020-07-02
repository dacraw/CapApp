message = ""
if @form_type == 'buy'
    message = "You have purchased #{@new_shares} shares of #{@portfolio.symbol}!"
else
    message = "You have sold #{@new_shares} shares of #{@portfolio.symbol}!"
end
json.set! @portfolio.user_id do
    # update cash available
    json.cashAvailable number_to_currency(User.find(@portfolio.user_id).cash_available.to_f)
    
    # update num shares in owned stocks
    json.ownedStocks do
        json.set! @portfolio.symbol do
            
            json.extract! @portfolio, :symbol, :num_shares
        end
    end
    json.newShares message
end
