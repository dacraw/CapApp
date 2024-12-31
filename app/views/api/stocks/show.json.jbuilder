require 'net/http'
require 'uri'
require 'json'
require_relative '../shared/news_api'

quote = @stock.daily_stock_quotes.current

if quote.blank?
    quote = DailyStockQuote.fetch_daily_data @stock.symbol
end
    
chart = quote.first.construct_stock_daily_graph

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
    
    about = JSON.parse(@stock.cached_company_about.data)
    json.about about
end