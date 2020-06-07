class Stock < ApplicationRecord
    validates :symbol, uniqueness: true

    has_many :user_stocks
end
