class Stock < ApplicationRecord
    validates :symbol, uniqueness: true

    has_many :daily_stock_quotes
end
