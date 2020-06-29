require 'net/http'
require 'uri'
require 'json'
require_relative '../shared/sample_state'
require_relative 'news_api'
require_relative '../shared/stock_parser'

# this uri uses the sandbox & test key
stockParser = StockParser.new(@stock.symbol)
price = stockParser.getPrice
chart = stockParser.getDefaultChart
# uri = URI.parse("https://sandbox.iexapis.com/stable/stock/market/batch?types=news,price&symbols=#{@stock.symbol}&token=#{ENV['TEST_IEX_KEY']}")
# # uri = URI.parse("https://sandbox.iexapis.com/stable/stock/market/batch?types=chart&symbols=fb&range=1d&token=#{ENV['TEST_IEX_KEY']}")
# priceNewsresponse = Net::HTTP.get_response(uri)
#JSON.parse(response.body)['FB']['chart']




# this pulls about copmany
aboutUri = URI.parse("https://cloud.iexapis.com/stable/stock/#{@stock.symbol}/company?token=#{ENV['REAL_IEX_KEY']}")
# aboutUri = URI.parse("https://sandbox.iexapis.com/stable/stock/#{@stock.symbol}/company?token=#{ENV['TEST_IEX_KEY']}")
#uri = URI.parse("https://sandbox.iexapis.com/stable/stock/market/batch?types=chart&symbols=fb&range=1d&token=#{ENV['TEST_IEX_KEY']}")
aboutResponse = Net::HTTP.get_response(aboutUri)

json.set! @stock.symbol do

    json.price price

    # chart
    #debugger
    # set the dollar and percentage change for the day based on current price
    # using last price of the chart for current price
    json.dollarChange (price - chart[0][:average]).round(2)
    json.percentageChange (((price / chart[0][:average]) - 1) * 100).round(2)

    news = StockNews.new(@stock.company)
    company_news = news.fetch # pulls 
    json.news company_news
    
    about = JSON.parse(aboutResponse.body) # 
    json.about about

end