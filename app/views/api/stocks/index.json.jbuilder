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

require_relative 'sample_state'

# how to access response:
# response.code
# response.body

@stocks.each do |stock|
    json.set! stock.symbol do
        json.extract! stock, :symbol, :company
        json.chart StockDefaults::SAMPLE_STATE_GRAPH[stock.symbol.to_sym][:chart]
             
    end
end

