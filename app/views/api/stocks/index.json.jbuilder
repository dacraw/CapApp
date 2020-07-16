require 'net/http'
require 'uri'
require 'json'
# require_relative 'sample_state'

## edit this bakc in for production!
# populate the initial state with stock data
#all_stock_symbols = Stock.pluck(:symbol).join(",")
# this uri uses the sandbox & test key
## change this from price,previous to ohlc, and use open and close prices for percentages. (if u ahve time)
#uri = URI.parse("https://sandbox.iexapis.com/stable/stock/market/batch?types=price,previous&symbols=#{all_stock_symbols}&range=5y&token=#{ENV['TEST_IEX_KEY']}")
#  ###############              ##      ##                                     
#
# using below for testing on local

require_relative '../shared/sample_state'
require_relative '../shared/stock_parser'



# how to access response:
# response.code
# response.body

@stocks.each do |stock|
    json.set! stock.symbol do
        stockParser = StockParser.new(stock.symbol)
        json.extract! stock, :symbol, :company, :id
        chart = stockParser.getChart
        price = stockParser.getDefaultPrice
        percentageChange = stockParser.getPercentageChange

        json.price price
        json.chart chart
        json.percentageChange percentageChange
    end
end

