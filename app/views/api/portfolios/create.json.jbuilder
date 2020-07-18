json.cashAvailable number_to_currency(current_user.cash_available)

        # json.chart

json.stocks do
     stock_share_summary = current_user.portfolios.group(:symbol).select('symbol, SUM(num_shares)')
     stock_share_summary.each do |stock|
         json.set! stock.symbol do
            next if !stock.sum <= 0
            json.extract! stock, :symbol, :sum
         end
     end
end
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