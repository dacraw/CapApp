require 'net/http'
require 'uri'
require 'json'
require_relative '../shared/sample_state'
require_relative '../shared/stock_parser'



# sandbox api call:
#uri = URI.parse("https://sandbox.iexapis.com/stable/stock/market/batch?types=price,previous&symbols=#{all_stock_symbols}&range=5y&token=#{ENV['TEST_IEX_KEY']}")

ownedStocks = current_user.stocks.pluck(:symbol)

@stocks.each do |stock|
    json.set! stock.symbol do
        json.symbol stock.symbol
        stockParser = StockParser.new(stock.symbol)
        json.extract! stock, :symbol, :company, :id
        
        chart = (ownedStocks.include?(stock.symbol)) ? stockParser.getChart : stockParser.chart

        price = stockParser.getDefaultPrice
        percentageChange = stockParser.getPercentageChange
        json.price price
        json.chart chart
        json.percentageChange percentageChange
    end
end

