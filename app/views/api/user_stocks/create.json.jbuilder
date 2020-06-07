userId = @user_stock.user.id

json.set! userId do
    @user_stock.stock.symbol
end

