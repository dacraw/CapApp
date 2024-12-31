class Stock < ApplicationRecord
    validates :symbol, uniqueness: true

    has_many :daily_stock_quotes
    has_many :company_abouts
    has_many :company_news

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

    def cached_company_news
        cached_company_news = company_news.order(created_at: :desc).limit(1).take

        if (cached_company_news.present? && (cached_company_news.created_at.utc - Time.now.utc > 6.hours)) || cached_company_news.blank?
            cached_company_news = CompanyNews.fetch_data self
        end

        cached_company_news
    end
end
