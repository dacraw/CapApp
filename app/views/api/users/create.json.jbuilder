

json.extract! @user, :id, :username
json.cashAvailable @user.cash_available
json.stocks @user.stocks.pluck(:symbol)