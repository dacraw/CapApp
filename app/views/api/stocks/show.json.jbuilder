require 'net/http'
require 'uri'
require 'json'


# this uri uses the sandbox & test key
uri = URI.parse("https://sandbox.iexapis.com/stable/stock/market/batch?types=chart,news,price&symbols=#{@stock.symbol}&range=1d&token=#{ENV['TEST_IEX_KEY']}")
#uri = URI.parse("https://sandbox.iexapis.com/stable/stock/market/batch?types=chart&symbols=fb&range=1d&token=#{ENV['TEST_IEX_KEY']}")
chartNewsresponse = Net::HTTP.get_response(uri)
#JSON.parse(response.body)['FB']['chart']
# this pulls about copmany
aboutUri = URI.parse("https://sandbox.iexapis.com/stable/stock/#{@stock.symbol}/company?token=#{ENV['TEST_IEX_KEY']}")
#uri = URI.parse("https://sandbox.iexapis.com/stable/stock/market/batch?types=chart&symbols=fb&range=1d&token=#{ENV['TEST_IEX_KEY']}")
aboutResponse = Net::HTTP.get_response(aboutUri)

json.set! @stock.symbol do
    # debugger
    chart = JSON.parse(chartNewsresponse.body)[@stock.symbol.upcase]['chart'] # pulls 
    json.chart chart

    news = JSON.parse(chartNewsresponse.body)[@stock.symbol.upcase]['news'] # pulls 
    json.news news
    
    price = JSON.parse(chartNewsresponse.body)[@stock.symbol.upcase]['price'] # 
    json.price price

    about = JSON.parse(aboutResponse.body) # 
    json.about about

    # debugger
end