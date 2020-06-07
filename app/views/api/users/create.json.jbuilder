json.set! @user.id do
    json.extract! @user, :id, :username, :cash_available
    json.stocks @user.stocks.pluck(:symbol)
end