class Stock < ApplicationRecord
    validates :symbol, uniqueness: true

    has_many :daily_stock_quotes
    has_many :company_abouts

    def cached_quote
        cached_quote = daily_stock_quotes.current.first

        if (cached_quote.present? && (cached_quote.created_at.utc < DailyStockQuote.todays_market_close_time_eastern && DailyStockQuote.market_has_closed?)) || cached_quote.blank?
            cached_quote = DailyStockQuote.fetch_daily_data self.symbol
        end

        cached_quote
    end

    def cached_company_about
        cached_company_about = company_abouts.order(created_at: :desc).limit(1).take

        if (cached_company_about.present? && (cached_company_about.created_at.utc - Time.now.utc > 6.months)) || cached_company_about.blank?
            cached_company_about = CompanyAbout.fetch_data self
        end

        cached_company_about
    end
end
