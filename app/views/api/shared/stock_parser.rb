require 'net/http'
require 'uri'
require 'json'
require_relative 'sample_state'


class StockParser
    attr_reader :symbol, :chart
    
    def initialize(symbol)
        @symbol = symbol
        
        @chart = getDefaultChart
    end

    def getPrice
        # uri = URI.parse("https://sandbox.iexapis.com/stable/stock/market/batch?types=price&symbols=#{symbol}&token=#{ENV['TEST_IEX_KEY']}")
        # response = Net::HTTP.get_response(uri)
        # currentPrice = JSON.parse(response.body)[symbol.upcase]['price'].round(2)
        # debugger
        currentPrice = 10

        avg = self.chart[-1][:average]
        price = avg || currentPrice
        price.round(2)
    end

    def getDefaultPrice
        # using a default state for pricing to keep pressure off API key during demo
        # debugger
        price = self.chart[-1][:average] || self.chart[-2][:average]
        price.round(2)
    end

    def getDefaultChart
        # debugger
        StockDefaults::SAMPLE_STATE_GRAPH[self.symbol.to_sym][:chart]
    end
end