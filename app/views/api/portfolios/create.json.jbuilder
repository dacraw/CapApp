json.cashAvailable number_to_currency(current_user.cash_available)

        # json.chart
#debugger
json.stocks current_user.portfolios.group(:symbol).select('symbol, SUM(num_shares)')
portfolioValue = 0
json.history do
  
    json.set! @portfolio.created_at do
        json.extract! @portfolio, :id, :user_id, :symbol, :num_shares, :created_at
    end
    stockParser = StockParser.new(@portfolio.symbol)
    stockPrice = stockParser.getDefaultPrice
    stockValue = @portfolio.num_shares * stockPrice
    portfolioValue += stockValue

end
json.portfolioValue portfolioValue