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
# intradayUri = URI.parse("https://sandbox.iexapis.com/stable/stock/fb/intraday-prices?chartInterval=5&token=#{ENV['TEST_IEX_KEY']}")
intradayChartresponse = Net::HTTP.get_response(intradayUri)

# this pulls about copmany
aboutUri = URI.parse("https://sandbox.iexapis.com/stable/stock/#{@stock.symbol}/company?token=#{ENV['TEST_IEX_KEY']}")
#uri = URI.parse("https://sandbox.iexapis.com/stable/stock/market/batch?types=chart&symbols=fb&range=1d&token=#{ENV['TEST_IEX_KEY']}")
aboutResponse = Net::HTTP.get_response(aboutUri)

json.set! @stock.symbol do
    # debugger
    currentPrice = JSON.parse(priceNewsresponse.body)[@stock.symbol.upcase]['price'].round(2) # 
    
    chart = JSON.parse(intradayChartresponse.body) # pulls 
    # if any nil values, asign to current price
    chart.map do |point,idx| 
        point['average'] = currentPrice if point['average'] == nil
        point['average'] = point['average'].round(2)
    end
    json.chart chart

    price = chart.last['average'].round(2)
    # set the stock price to the last average of the chart
    json.price price

    # set the dollar and percentage change for the day based on current price
    # using last price of the chart for current price
    dollar_change = (price - chart[0]['average']).round(2)
    percentage_change = (((price / chart[0]['average']) - 1) * 100).round(2)
    json.change "$#{dollar_change} (#{percentage_change}%)"
        


    news = JSON.parse(priceNewsresponse.body)[@stock.symbol.upcase]['news'] # pulls 
    json.news news
    

    about = JSON.parse(aboutResponse.body) # 
    json.about about

    
end