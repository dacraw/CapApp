require 'net/http'

class User < ApplicationRecord
    validates :username, presence: { message: 'Please enter your email'}, email: {message: "Please enter a valid email."}, uniqueness: true
    validates :session_token, presence: true, uniqueness: true
    validates :fname, presence: { message: "Please enter your first name."}
    validates :lname, presence: { message: "Please enter your last name."}
    validates :password_digest, presence: true
    validates :password, length: { minimum: 6, message: "Your password must be at least 6 characters." }, allow_nil: true
    after_initialize :ensure_session_token
    attr_reader :password

    has_many :portfolios,
        foreign_key: :user_id,
        class_name: :Portfolio

    has_many :stocks,
        through: :portfolios,
        source: :stocks


    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
        return nil unless (user && user.is_password?(password))
        user
    end

    def is_password?(password)
        pw_dig = BCrypt::Password.new(self.password_digest)
        pw_dig.is_password?(password)
    end

    def self.generate_session_token
        SecureRandom::urlsafe_base64
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def ensure_session_token
        self.session_token ||= User.generate_session_token
    end

    def reset_session_token!
        self.update(session_token: User.generate_session_token)
        self.session_token
    end

    def portfolio_value
        # Iterate through the stocks owned by the current user in their portfolio
        portfolios = self.portfolios
        symbols_in_portfolio = portfolios.distinct.pluck(:symbol)
        stocks = Stock.where('stocks.symbol IN (?)', symbols_in_portfolio)

        # Store the values from the API call into a hash to use for calculating porfolio value on each of the last 30 days
        hash = {}

        stocks.each do |stock|
            # first check if the API results have been persisted to the DB
            cached_quote = stock.daily_stock_quotes.where('created_at >= ?', Time.now.utc.beginning_of_day)
            if cached_quote.present?
                hash[stock.symbol] = cached_quote.first.data["Time Series (Daily)"]
            else
                quote = DailyStockQuote.fetch_daily_data stock.symbol
                hash[stock.symbol] = quote.first.data["Time Series (Daily)"]
            end
        end

        # Form the JSON object for the frontend
        arr = []
        (30.days.ago.to_i..Time.now.to_i).step(1.day).each do |seconds|
            date_time = Time.at(seconds) 
            
            previous_transactions = portfolios.filter {|transaction| transaction[:created_at] <= date_time.utc}
            value = 0
            previous_transactions.each do |transaction|
                price = hash.dig(transaction[:symbol], date_time.strftime("%Y-%m-%d"), "1. open")
                if price
                    value += transaction[:num_shares] * price.to_f
                else
                    value += transaction[:num_shares] * transaction[:stock_price]
                end
            end

            arr << { label: date_time.strftime("%Y-%m-%d"), vw: value }
        end

        arr
    end
end



