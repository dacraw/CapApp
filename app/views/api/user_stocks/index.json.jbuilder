json.set! @user.id do
    @user.owned_stocks.each do |stock|
        json.extract! stock.symbol
    end
end