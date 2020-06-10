require 'net/http'
require 'uri'
require 'json'


# this uri uses the sandbox & test key
uri = URI.parse("https://sandbox.iexapis.com/stable/stock/market/batch?types=news,price&symbols=#{@stock.symbol}&token=#{ENV['TEST_IEX_KEY']}")
#uri = URI.parse("https://sandbox.iexapis.com/stable/stock/market/batch?types=chart&symbols=fb&range=1d&token=#{ENV['TEST_IEX_KEY']}")
priceNewsresponse = Net::HTTP.get_response(uri)
#JSON.parse(response.body)['FB']['chart']

#pulls intraday chart
intradayUri = URI.parse("https://sandbox.iexapis.com/stable/stock/#{@stock.symbol}/intraday-prices?chartInterval=5&token=#{ENV['TEST_IEX_KEY']}")
intradayChartresponse = Net::HTTP.get_response(intradayUri)

# this pulls about copmany
aboutUri = URI.parse("https://sandbox.iexapis.com/stable/stock/#{@stock.symbol}/company?token=#{ENV['TEST_IEX_KEY']}")
#uri = URI.parse("https://sandbox.iexapis.com/stable/stock/market/batch?types=chart&symbols=fb&range=1d&token=#{ENV['TEST_IEX_KEY']}")
aboutResponse = Net::HTTP.get_response(aboutUri)

json.set! @stock.symbol do
    
    chart = JSON.parse(intradayChartresponse.body) # pulls 
    json.chart chart

    news = JSON.parse(priceNewsresponse.body)[@stock.symbol.upcase]['news'] # pulls 
    json.news news
    
    price = JSON.parse(priceNewsresponse.body)[@stock.symbol.upcase]['price'].round(2) # 
    json.price price

    about = JSON.parse(aboutResponse.body) # 
    json.about about

    
end