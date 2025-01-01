require "net/http"

class DailyStockQuote < ApplicationRecord
    validates_presence_of :date_start, :date_end, :data
    
    belongs_to :stock

    scope :current, -> { where("created_at >= ?", Time.now.utc.beginning_of_day).order(created_at: :desc).limit(1) }

    def self.current_time_eastern
        Time.now.utc.in_time_zone('Eastern Time (US & Canada)')
    end

    def self.todays_market_close_time_eastern
        Time
            .now
            .in_time_zone('Eastern Time (US & Canada)')
            # using 40 mins to give api time to update after market close
            .change(hour: 16, min: 40)
    end

    def self.market_has_closed?
        DailyStockQuote.current_time_eastern >= DailyStockQuote.todays_market_close_time_eastern
    end

    def self.fetch_daily_data(stock_ticker)
        stock = Stock.find_by_symbol(stock_ticker)
        if stock.blank?
            throw "Stock doesn't exist in database"
        end

        uri = URI.parse "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=#{stock_ticker}&apikey=#{ENV['ALPHA_VANTAGE_KEY']}"
        response = Net::HTTP.get_response uri
        data = JSON.parse response.body

        puts "Fetch_daily_data, data: #{data}"

        if data.blank?
            stock = Stock.find_by_symbol(stock_ticker)
            return [stock.daily_stock_quotes.last]
        end

        date_start = data['Time Series (Daily)'].keys.last
        date_end = data['Time Series (Daily)'].keys.first
        
        DailyStockQuote.create(
            date_start: date_start,
            date_end: date_end,
            stock: stock,
            data: data
        )
    end

    def construct_stock_daily_graph
        chart = []
        last_price = nil

        most_recent_date = data["Time Series (Daily)"].entries.first[0]
        end_date = Time.parse(most_recent_date)
        start_date = end_date - 30.days 


        (start_date.to_i..end_date.to_i).step(1.day).each do |seconds|
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
