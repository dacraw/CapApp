class Stock < ApplicationRecord
    validates :symbol, uniqueness: true

    has_many :daily_stock_quotes

    def cached_quote
        cached_quote = daily_stock_quotes.current.first

        if (cached_quote.present? && (cached_quote.created_at.utc < DailyStockQuote.todays_market_close_time_eastern && DailyStockQuote.market_has_closed?)) || cached_quote.blank?
            cached_quote = DailyStockQuote.fetch_daily_data self.symbol
        end

        cached_quote
    end
end
