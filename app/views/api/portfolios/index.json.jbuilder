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
            json.percentageChange percentage_change
            json.price price
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
            # byebug
            priceHash[item.symbol] = stockParser.chart[-1][:average]

            # for now while debugging, using default values
            # priceHash[item.symbol] = stockParser.getChart[-1][:average]
        end

        stockValue = item.num_shares * priceHash[item.symbol]
        portfolioValue += stockValue
    end
end
json.portfolioValue portfolioValue.round(2)

# news_API = NewsAPI.new
# news = news_API.fetchBusiness
# json.news news

