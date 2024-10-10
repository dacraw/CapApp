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
end
