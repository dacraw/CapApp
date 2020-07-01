class Portfolio < ApplicationRecord
    validates :user_id, presence: true, uniqueness: { scope: :symbol }
    validates :stock_price, :formType, length: {minimum: 0}, allow_nil: true
    validates :num_shares, presence: true

    attr_reader :stock_price, :formType
    
    def stock_price=(stock_price)
        @stock_price = nil
    end

    def formType=(formType)
        @formType = nil
    end

    belongs_to :user

    belongs_to :stocks,
        primary_key: :symbol,
        foreign_key: :symbol,
        class_name: :Stock
end
