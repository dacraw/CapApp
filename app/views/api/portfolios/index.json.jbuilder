# @portfolio represents a collection of items matching user_id

# {
#     1: {
#         portfolio: []
#     }
# }

require_relative '../shared/stock_parser'
require_relative '../shared/news_api'

#debugger

json.cashAvailable number_to_currency(current_user.cash_available)

        # json.chart
#debugger
json.stocks @portfolio.group(:symbol).select('symbol, SUM(num_shares)')
portfolioValue = 0
json.history do
    @portfolio.each do |item|
        #debugger
        created_at = item.created_at
        json.set! created_at do
            json.extract! item, :id, :user_id, :symbol, :num_shares, :created_at
        end
        stockParser = StockParser.new(item.symbol)
        stockPrice = stockParser.getDefaultPrice
        stockValue = item.num_shares * stockPrice
        portfolioValue += stockValue
    end
end
json.portfolioValue number_to_currency(portfolioValue)

# news_API = NewsAPI.new
# news = news_API.fetchBusiness
# json.news news

