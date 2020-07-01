# @portfolio represents a collection of items matching user_id

# {
#     1: {
#         portfolio: []
#     }
# }

require_relative '../shared/stock_parser'
require_relative '../shared/news_api'

json.set! @portfolio.first.user_id do
    json.cashAvailable number_to_currency(@portfolio.first.user.cash_available)

    portfolioValue = 0
    json.ownedStocks do
        @portfolio.each do |item|
            json.set! item.symbol do
                json.symbol item.symbol
                json.num_shares item.num_shares 
            end
            stockParser = StockParser.new(item.symbol)
            stockPrice = stockParser.getDefaultPrice
            stockValue = item.num_shares * stockPrice
            portfolioValue += stockValue
        end
    end
    json.portfolioValue number_to_currency(portfolioValue)

    news_API = NewsAPI.new
    news = news_API.fetchBusiness
    json.news news
end
