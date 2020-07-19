require_relative '../shared/stock_parser'

json.cashAvailable number_to_currency(current_user.cash_available)

        # json.chart

json.stocks do
    stock_share_summary = current_user.portfolios.group(:symbol).select('symbol, SUM(num_shares)')
    stock_share_summary.each do |stock|
        if stock.sum <= 0 
            next
        end
        json.set! stock.symbol do
            json.extract! stock, :symbol, :sum
        end
    end
end
portfolioValue = 0
json.history do
  
    json.set! @portfolio.created_at do
        
        json.extract! @portfolio, :id, :user_id, :symbol, :num_shares, :created_at
        json.stock_price @portfolio[:stock_price]
    end
    stockParser = StockParser.new(@portfolio.symbol)
    stockChart = stockParser.getChart
    #stockPrice = stockParser.getPrice
    stockValue = @portfolio.num_shares * @portfolio['stock_price']
    portfolioValue += stockValue

end
json.portfolioValue portfolioValue