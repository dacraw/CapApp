
symbols = @user.owned_stocks.map do |stock|
    stock.symbol
end
json.user_id @user.id
json.ownedStocks symbols
