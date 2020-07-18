require 'net/http'
require 'uri'
require 'json'
require_relative 'sample_state'


class StockParser
    attr_reader :symbol 
    attr_accessor :chart, :price, :dollarChange, :percentageChange
    
    def initialize(symbol)
        @symbol = symbol
        @chart = self.getDefaultChart
    end

    def getPrice
        uri = URI.parse("https://sandbox.iexapis.com/stable/stock/market/batch?types=price&symbols=#{symbol}&token=#{ENV['TEST_IEX_KEY']}")
        response = Net::HTTP.get_response(uri)
        @price = JSON.parse(response.body)[symbol.upcase]['price'].round(2)
        @price       
        # currentPrice = 10
        # avg = self.chart[-1][:average] || self.chart[-2][:average]
        # @price = avg || currentPrice
        # @price.round(2)
    end

    def getDefaultPrice
        # using a default state for pricing to keep pressure off API key during demo
        #debugger
        average = self.chart[0][:average] || self.chart[0]['average']
        @price = average
        @price.round(2)
    end

    def getDefaultChart
        @chart = StockDefaults::SAMPLE_STATE_GRAPH[self.symbol.to_sym][:chart]
        # @chart
    end
    def getChart
        uri = URI.parse("https://cloud.iexapis.com/stable/stock/#{self.symbol}/intraday-prices?chartInterval=5&token=#{ENV['REAL_IEX_KEY']}")
        # uri = URI.parse("https://sandbox.iexapis.com/stable/stock/#{self.symbol}/intraday-prices?chartInterval=5&token=#{ENV['TEST_IEX_KEY']}")
        response = Net::HTTP.get_response(uri)
        #debugger
        raw_chart = JSON.parse(response.body)
        raw_chart.each_with_index do |chartItem, idx|
            if (chartItem['average'] == nil) # check for nil values from api call and replace
                raw_chart[idx]['average'] = raw_chart[idx-1]['average'] || raw_chart[idx-2]['average'] 
            end
        end
        @chart = raw_chart
        raw_chart
    end

    def getDollarChange
        #debugger
        # set the dollar and percentage change for the day based on current price
        # using last price of the chart for current price
        average = self.chart[0][:average] || self.chart[0]['average']
        @dollarChange = (self.price - average).round(2)
        @dollarChange
    end
    def getPercentageChange
        # set the dollar and percentage change for the day based on current price
        # using last price of the chart for current price
        #debugger
        # using last price of the chart for current price
        average = self.chart[0][:average] || self.chart[0]['average']
        @percentageChange = ((self.price / average - 1) * 100).round(2)
        @percentageChange
    end
end