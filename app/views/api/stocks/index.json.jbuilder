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
        charts = stockParser.chart
        # charts = (ownedStocks.include?(stock.symbol)) ? stockParser.getChart : stockParser.chart

        quote = stock.daily_stock_quotes.where("date_end >= ?", Date.today.beginning_of_day)

    
        chart = []
        if quote.blank?
            quote = DailyStockQuote.fetch_daily_data stock.symbol
        end        

        data = quote.first.data["Time Series (Daily)"]
        price = data.values.first
        json.price price["4. close"] ? price["4. close"] : price["1. open"]

        if price["4. close"]
            percentage_change = (price["4. close"].to_f - price["1. open"].to_f) / price["1. open"].to_f * 100
        else
            previous_price = data.values.second
            percentage_change = (price["1.open"].to_f - previous_price["4. close"].to_f) / previous_price["4. close"].to_f * 100
        end
        json.percentageChange percentage_change.round(2)

        last_price = nil
        (30.days.ago.to_i..Time.now.to_i).step(1.day).each do |seconds|
            date_time = Time.at(seconds) 

            value_at_date = data.dig(date_time.strftime("%Y-%m-%d"))

            if value_at_date
                value = value_at_date["4. close"] ? value_at_date["4. close"] : value_at_date["1. open"]
                chart << { label: date_time.strftime("%Y-%m-%d"), vw: value}
                last_price = value
            else
                chart << { label: date_time.strftime("%Y-%m-%d"), vw: last_price}
            end
        end
        
        json.chart chart
    end
end

