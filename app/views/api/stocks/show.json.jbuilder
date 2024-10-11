require 'net/http'
require 'uri'
require 'json'
require_relative '../shared/news_api'

quote = @stock.daily_stock_quotes.where('date_end >= ?', Date.today.beginning_of_day)

if quote.blank?
    quote = DailyStockQuote.fetch_daily_data @stock.symbol
end
    
chart = quote.first.construct_stock_daily_graph

# this pulls about copmany

# NEED TO CACHE THE ABOUT API REQUEST IN ORDER TO AVOID RECEIVING NO DATA

aboutUri = URI.parse("https://api.polygon.io/v3/reference/tickers/#{@stock.symbol}?apiKey=#{ENV['POLYGON_KEY']}")
aboutResponse = Net::HTTP.get_response(aboutUri)

json.set! @stock.symbol do
    json.symbol @stock.symbol

    json.chart chart

    data = quote.first.data["Time Series (Daily)"].values

    current_price = (data.first["4. close"] ? data.first["4. close"] : data.first["1. open"]).to_f
    previous_price = (data.second["4. close"] ? data.second["4. close"] : data.second["1. open"]).to_f

    json.price current_price
    # set the dollar and percentage change for the day based on current price
    # using last price of the chart for current price
    json.dollarChange current_price - previous_price

    percentage_change = ((current_price - previous_price) / previous_price * 100).round(2)
    json.percentageChange percentage_change

    news = NewsAPI.new(@stock.company)
    company_news = news.fetch # pulls 
    json.news company_news
    
    about = JSON.parse(aboutResponse.body)
    json.about about
end