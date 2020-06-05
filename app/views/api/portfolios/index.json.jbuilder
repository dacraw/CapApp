json.extract! @portfolio, :id, :user_id
json.cashAvailable number_to_currency(@portfolio.cash_available)
