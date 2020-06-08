require 'net/http'
require 'uri'
require 'json'

# this uri uses the sandbox & test key
uri = URI.parse("https://sandbox.iexapis.com/stable/stock/market/batch?types=chart,news&symbols=#{@stock.symbol}&range=1d&token=#{ENV['TEST_IEX_KEY']}")
#uri = URI.parse("https://sandbox.iexapis.com/stable/stock/market/batch?types=chart&symbols=fb&range=1d&token=#{ENV['TEST_IEX_KEY']}")
chartNewsresponse = Net::HTTP.get_response(uri)
#JSON.parse(response.body)['FB']['chart']
# this pulls about copmany
aboutUri = URI.parse("https://sandbox.iexapis.com/stable/stock/#{@stock.symbol}/company?token=#{ENV['TEST_IEX_KEY']}")
#uri = URI.parse("https://sandbox.iexapis.com/stable/stock/market/batch?types=chart&symbols=fb&range=1d&token=#{ENV['TEST_IEX_KEY']}")
aboutResponse = Net::HTTP.get_response(aboutUri)

json.set! @stock.symbol do
    chart = JSON.parse(chartNewsresponse.body)[@stock.symbol.upcase]['chart'] # pulls current price
    json.chart chart

    news = JSON.parse(chartNewsresponse.body)[@stock.symbol.upcase]['news'] # pulls current price
    json.news news
    
    about = JSON.parse(aboutResponse.body) # pulls current price
    json.about about
    # debugger
end