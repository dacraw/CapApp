require_relative '../shared/stock_parser'

json.cashAvailable number_to_currency(current_user.cash_available)

        # json.chart

json.stocks do
    stock_share_summary = current_user.portfolios.group(:symbol).select('symbol, SUM(num_shares)')
    stock_share_summary.each do |portfolio_stock|
        if portfolio_stock.sum <= 0 || portfolio_stock.sum < 0.01
            next
        end
        json.set! portfolio_stock.symbol do
            json.extract! portfolio_stock, :symbol, :sum
            json.sum portfolio_stock.sum.round(2)

            stock = Stock.find_by_symbol(portfolio_stock.symbol)
            json.chart stock.cached_quote.construct_stock_daily_graph
        end
    end
end
portfolioValue = 0
json.history do
  
    json.set! @portfolio.created_at do
        
        json.extract! @portfolio, :id, :user_id, :symbol, :num_shares, :created_at
        json.stock_price @portfolio[:stock_price]
    end
    # stockParser = StockParser.new(@portfolio.symbol)
    stock = Stock.find_by_symbol @portfolio.symbol
    stockChart = stock.cached_quote.construct_stock_daily_graph
    #stockChart = stockParser.getChart
    stockValue = @portfolio.num_shares * @portfolio['stock_price']
    portfolioValue += stockValue

end
json.portfolioValue portfolioValue.round(2)