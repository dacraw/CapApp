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
        json.extract! stock, :symbol, :company, :id

        # Fetch an existing quote from the DB, otherwise from the API
        quote = stock.daily_stock_quotes.where("created_at >= ?", Time.now.utc.beginning_of_day)
        
        quote = DailyStockQuote.fetch_daily_data stock.symbol if quote.blank?

        data = quote.first.data["Time Series (Daily)"]

        # Price - prioritize close price, default is open price
        price = data.values.first
        json.price price["4. close"] ? price["4. close"] : price["1. open"]

        # Percentage Change - if the data doesn't contain the close price, use the previous day's close price
        if price["4. close"]
            percentage_change = (price["4. close"].to_f - price["1. open"].to_f) / price["1. open"].to_f * 100
        else
            previous_price = data.values.second
            percentage_change = (price["1.open"].to_f - previous_price["4. close"].to_f) / previous_price["4. close"].to_f * 100
        end
        json.percentageChange percentage_change.round(2)

        # Chart
        json.chart quote.first.construct_stock_daily_graph
    end
end

