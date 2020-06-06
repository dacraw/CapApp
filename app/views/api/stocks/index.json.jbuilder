require 'net/http'
require 'uri'
require 'json'

# populate the initial state with stock data
all_stock_symbols = Stock.pluck(:symbol).join(",")
# this uri uses the sandbox & test key
uri = URI.parse("https://sandbox.iexapis.com/stable/stock/market/batch?types=price,previous&symbols=#{all_stock_symbols}&range=5y&token=#{ENV['TEST_IEX_KEY']}")
response = Net::HTTP.get_response(uri)
JSON.parse(response.body)

# how to access response:
# response.code
# response.body

@stocks.each do |stock|
    json.set! stock.symbol do
        json.extract! stock, :symbol, :id
# debugger
        # uri = URI.parse("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=#{stock.symbol.upcase}&apikey=7YVL16BDCKAB0BEU")
        #uri = URI.parse("https://sandbox.iexapis.com/stable/stock/GOOG/quote?token=Tpk_6b9b93666ee34896b554a35f81ecbd3a")

        current_price = JSON.parse(response.body)[stock.symbol]["price"]
        json.currentPrice current_price
    end
end

# 7YVL16BDCKAB0BEU