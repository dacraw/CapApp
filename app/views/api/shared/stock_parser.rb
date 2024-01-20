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
        # uri = URI.parse("https://sandbox.iexapis.com/stable/stock/market/batch?types=price&symbols=#{symbol}&token=#{ENV['TEST_IEX_KEY']}")
        # response = Net::HTTP.get_response(uri)
        # @price = JSON.parse(response.body)[symbol.upcase]['price'].round(2)
        # @price
        
        @price = self.chart[-1]['average'] || self.chart[-1][:average]     
        @price.round(2)
        # currentPrice = 10
        # avg = self.chart[-1][:average] || self.chart[-2][:average]
        # @price = avg || currentPrice
        # @price.round(2)
    end

    def getDefaultPrice
        # using a default state for pricing to keep pressure off API key during demo
        average = self.chart[-1][:average] || self.chart['results'][-1]['average']
        @price = average
        @price.round(2)
    end

    def getDefaultChart
        @chart = StockDefaults::SAMPLE_STATE_GRAPH[self.symbol.to_sym][:results]
        @chart.each_with_index {|item, idx| @chart[idx][:average] = item[:vw] }
    end
    def getChart
        uri = URI.parse("https://api.polygon.io/v2/aggs/ticker/#{self.symbol}/range/1/day/2022-12-01/2023-01-01?adjusted=true&sort=asc&limit=120&apiKey=#{ENV['POLYGON_KEY']}")
        # uri = URI.parse("https://cloud.iexapis.com/stable/stock/#{self.symbol}/intraday-prices?chartInterval=5&token=#{ENV['REAL_IEX_KEY']}")
        # uri = URI.parse("https://sandbox.iexapis.com/stable/stock/#{self.symbol}/intraday-prices?chartInterval=5&token=#{ENV['TEST_IEX_KEY']}")
        response = Net::HTTP.get_response(uri)
        
        raw_chart = JSON.parse(response.body)
        raw_chart['results'].each_with_index do |chartItem, idx|
            raw_chart['results'][idx]['average'] = chartItem['vw']
            if (chartItem['vw'] == nil) # check for nil values from api call and replace
                raw_chart['results'][idx]['average'] = raw_chart['results'][idx-1]['vw'] || raw_chart['results'][idx-2]['vw'] 
            end
        end
        @chart = raw_chart
        raw_chart
    end

    def getDollarChange
        
        # set the dollar and percentage change for the day based on current price
        # using last price of the chart for current price
        average = self.chart[0][:average] || self.chart[0]['average']
        @dollarChange = (self.price - average).round(2)
        @dollarChange
    end
    def getPercentageChange
        # set the dollar and percentage change for the day based on current price
        # using last price of the chart for current price
        
        # using last price of the chart for current price
        average = self.chart[0][:average] || self.chart[0]['average']
        @percentageChange = ((self.price / average - 1) * 100).round(2)
        @percentageChange
    end
end