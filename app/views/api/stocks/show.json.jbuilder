require 'net/http'
require 'uri'
require 'json'
require_relative 'sample_state'
require_relative 'news_api'

# this uri uses the sandbox & test key
uri = URI.parse("https://sandbox.iexapis.com/stable/stock/market/batch?types=news,price&symbols=#{@stock.symbol}&token=#{ENV['TEST_IEX_KEY']}")
# uri = URI.parse("https://sandbox.iexapis.com/stable/stock/market/batch?types=chart&symbols=fb&range=1d&token=#{ENV['TEST_IEX_KEY']}")
priceNewsresponse = Net::HTTP.get_response(uri)
#JSON.parse(response.body)['FB']['chart']




# this pulls about copmany
aboutUri = URI.parse("https://sandbox.iexapis.com/stable/stock/#{@stock.symbol}/company?token=#{ENV['TEST_IEX_KEY']}")
#uri = URI.parse("https://sandbox.iexapis.com/stable/stock/market/batch?types=chart&symbols=fb&range=1d&token=#{ENV['TEST_IEX_KEY']}")
aboutResponse = Net::HTTP.get_response(aboutUri)

json.set! @stock.symbol do
    # debugger
    currentPrice = JSON.parse(priceNewsresponse.body)[@stock.symbol.upcase]['price'].round(2) # 

    # set the stock price to the last average of the chart
    chart = StockDefaults::SAMPLE_STATE_GRAPH[@stock.symbol.to_sym][:chart]
    avg = chart[-1][:average]
    price = avg || currentPrice
    json.price price.round(2)

    # chart
    #debugger
    # set the dollar and percentage change for the day based on current price
    # using last price of the chart for current price
    json.dollarChange (price - chart[0][:average]).round(2)
    json.percentageChange (((price / chart[0][:average]) - 1) * 100).round(2)

    news = StockNews.new('Apple')
    company_news = news.fetch # pulls 
    # debugger
    json.news company_news['articles']
    
    about = JSON.parse(aboutResponse.body) # 
    json.about about

end