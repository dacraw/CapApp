

json.extract! @user, :id, :username
json.cashAvailable number_to_currency(@user.cash_available)
json.ownedStocks do
    @user.portfolios.each do |item|
        json.set! item.symbol do
            json.symbol item.symbol
            json.num_shares item.num_shares 
        end
    end
end
