json.set! @user.id do
    symbols = @user.owned_stocks.map do |stock|
        stock.symbol
    end
    json.ownedStocks symbols
end