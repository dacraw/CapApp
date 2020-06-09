

json.extract! @user, :id, :username
json.cashAvailable number_to_currency(@user.cash_available)
