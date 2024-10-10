require "net/http"

class DailyStockQuote < ApplicationRecord
    validates_presence_of :date_start, :date_end, :data
    
    belongs_to :stock

    def self.fetch_daily_data(stock_ticker)
        stock = Stock.find_by_symbol(stock_ticker)
        if stock.blank?
            throw "Stock doesn't exist in database"
        end

        uri = URI.parse "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=#{stock_ticker}&apikey=#{ENV['ALPHA_VANTAGE_KEY']}"
        response = Net::HTTP.get_response uri
        data = JSON.parse response.body

        date_start = data['Time Series (Daily)'].keys.last
        date_end = data['Time Series (Daily)'].keys.first
        
        [DailyStockQuote.create(
            date_start: date_start,
            date_end: date_end,
            stock: stock,
            data: data
        )]
    end

    def construct_stock_daily_graph
        chart = []
        last_price = nil

        (30.days.ago.to_i..Time.now.to_i).step(1.day).each do |seconds|
            date_time = Time.at(seconds) 

            value_at_date = self.data["Time Series (Daily)"].dig(date_time.strftime("%Y-%m-%d"))

            if value_at_date
                value = value_at_date["4. close"] ? value_at_date["4. close"] : value_at_date["1. open"]
                chart << { label: date_time.strftime("%Y-%m-%d"), vw: value}
                last_price = value
            else
                chart << { label: date_time.strftime("%Y-%m-%d"), vw: last_price}
            end
        end

        chart
    end
end
