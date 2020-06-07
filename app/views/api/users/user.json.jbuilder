json.extract! @user, :id, :username
json.cashAvailable @user.portfolio.cash_available
json.ownedStocks @user.owned_stocks
 