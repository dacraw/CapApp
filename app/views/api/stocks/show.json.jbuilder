require 'net/http'
require 'uri'
require 'json'
require_relative '../shared/sample_state'
require_relative '../shared/news_api'
require_relative '../shared/stock_parser'

# this uri uses the sandbox & test key
stockParser = StockParser.new(@stock.symbol)

quote = @stock.daily_stock_quotes.where('date_end >= ?', Date.today.beginning_of_day)

if quote.blank?
    quote = DailyStockQuote.fetch_daily_data @stockstock.symbol @stock.construct_stock_daily_graph
end
    
chart = quote.first.construct_stock_daily_graph

price = stockParser.getPrice

# price = stockParser.getPrice
# chart = stockParser.getDefaultChart
dollarChange = stockParser.getDollarChange
percentageChange = stockParser.getPercentageChange
# uri = URI.parse("https://sandbox.iexapis.com/stable/stock/market/batch?types=news,price&symbols=#{@stock.symbol}&token=#{ENV['TEST_IEX_KEY']}")
# # uri = URI.parse("https://sandbox.iexapis.com/stable/stock/market/batch?types=chart&symbols=fb&range=1d&token=#{ENV['TEST_IEX_KEY']}")
# priceNewsresponse = Net::HTTP.get_response(uri)
#JSON.parse(response.body)['FB']['chart']




# this pulls about copmany
aboutUri = URI.parse("https://api.polygon.io/v3/reference/tickers/#{@stock.symbol}?apiKey=#{ENV['POLYGON_KEY']}")
# aboutUri = URI.parse("https://cloud.iexapis.com/stable/stock/#{@stock.symbol}/company?token=#{ENV['REAL_IEX_KEY']}")
# aboutUri = URI.parse("https://sandbox.iexapis.com/stable/stock/#{@stock.symbol}/company?token=#{ENV['TEST_IEX_KEY']}")
#uri = URI.parse("https://sandbox.iexapis.com/stable/stock/market/batch?types=chart&symbols=fb&range=1d&token=#{ENV['TEST_IEX_KEY']}")
aboutResponse = Net::HTTP.get_response(aboutUri)

json.set! @stock.symbol do
    json.symbol @stock.symbol

    json.price quote.first.data["Time Series (Daily)"].values.first["1. open"]

    json.chart chart

    # set the dollar and percentage change for the day based on current price
    # using last price of the chart for current price
    json.dollarChange dollarChange
    json.percentageChange percentageChange

    news = NewsAPI.new(@stock.company)
    company_news = news.fetch # pulls 
    json.news company_news
    
    about = JSON.parse(aboutResponse.body)["results"] # 
    json.about about

end