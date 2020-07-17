require 'net/http'
require 'uri'
require 'json'
require_relative 'sample_state'


class StockParser
    attr_reader :symbol, :chart, :price, :dollarChange, :percentageChange
    
    def initialize(symbol)
        @symbol = symbol
        
        @chart = getDefaultChart
    end

    def getPrice
        # uri = URI.parse("https://sandbox.iexapis.com/stable/stock/market/batch?types=price&symbols=#{symbol}&token=#{ENV['TEST_IEX_KEY']}")
        # response = Net::HTTP.get_response(uri)
        # currentPrice = JSON.parse(response.body)[symbol.upcase]['price'].round(2)
        
        currentPrice = 10

        avg = self.chart[-1][:average]
        @price = avg || currentPrice
        @price.round(2)
    end

    def getDefaultPrice
        # using a default state for pricing to keep pressure off API key during demo
        
        @price = self.chart[-1][:average] || self.chart[-2][:average]
        @price.round(2)
    end

    def getDefaultChart
        StockDefaults::SAMPLE_STATE_GRAPH[self.symbol.to_sym][:chart]
    end
    def getChart
        uri = URI.parse("https://cloud.iexapis.com/stable/stock/#{self.symbol}/intraday-prices?chartInterval=5&token=#{ENV['REAL_IEX_KEY']}")
        # uri = URI.parse("https://sandbox.iexapis.com/stable/stock/#{self.symbol}/intraday-prices?chartInterval=5&token=#{ENV['TEST_IEX_KEY']}")
        response = Net::HTTP.get_response(uri)
        chart = JSON.parse(response.body)
        chart
    end

    def getDollarChange
        # set the dollar and percentage change for the day based on current price
        # using last price of the chart for current price
        @dollarChange = (self.price - self.chart[0][:average]).round(2)
        @dollarChange
    end
    def getPercentageChange
        # set the dollar and percentage change for the day based on current price
        # using last price of the chart for current price
        @percentageChange = (((self.price / self.chart[0][:average]) - 1) * 100).round(2)
        @percentageChange
    end
end