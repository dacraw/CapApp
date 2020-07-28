# @portfolio represents a collection of items matching user_id

# {
#     1: {
#         portfolio: []
#     }
# }

require_relative '../shared/stock_parser'
require_relative '../shared/news_api'



json.cashAvailable number_to_currency(current_user.cash_available)

        # json.chart

json.stocks do
    
    stock_share_summary = @portfolio.group(:symbol).select('symbol, SUM(num_shares)')
    stock_share_summary.each do |stock|
        json.set! stock.symbol do
            if stock.sum <= 0 
                next
            end
            json.extract! stock, :symbol, :sum
        end
    end
end
portfolioValue = 0
priceHash = {};
json.history do
    @portfolio.each do |item|
        
        created_at = item.created_at
        json.set! created_at do
            
            json.extract! item, :id, :user_id, :symbol, :num_shares, :created_at
            
            json.stock_price item[:stock_price]
        end
        if (!priceHash[item.symbol]) 
            stockParser = StockParser.new(item.symbol)
            priceHash[item.symbol] = stockParser.getChart[-1]['average']
        end
        stockValue = item.num_shares * priceHash[item.symbol]
        portfolioValue += stockValue
    end
end
json.portfolioValue portfolioValue

# news_API = NewsAPI.new
# news = news_API.fetchBusiness
# json.news news

