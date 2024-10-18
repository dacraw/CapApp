require_relative '../shared/stock_parser'
require_relative '../shared/news_api'

portfolio_graph = current_user.portfolio_value

json.cashAvailable number_to_currency(current_user.cash_available)
json.portfolioGraph portfolio_graph

json.stocks do
    stock_share_summary = @portfolio.group(:symbol).select('symbol, SUM(num_shares)').having('SUM(num_shares) > ?', 0)

    stock_share_summary.each do |summary|
        stock = Stock.find_by_symbol(summary.symbol)
        quote = stock.daily_stock_quotes.current
        quote = DailyStockQuote.fetch_daily_data stock.symbol if quote.blank?
        graph = quote.first.construct_stock_daily_graph
        percentage_change = (graph[-1][:vw].to_f - graph[-2][:vw].to_f) / graph[-2][:vw].to_f * 100
        price = graph[-1][:vw]

        json.set! summary.symbol do
            json.extract! summary, :symbol
            json.sum summary.sum.round(2)
            json.chart graph
            json.percentageChange percentage_change.round 2
            json.price price
        end
    end
end

json.portfolioValue portfolio_graph.last[:vw]

