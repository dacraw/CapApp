class Portfolio < ApplicationRecord
    validates :user_id, presence: true, uniqueness: { scope: :symbol }
    validates :num_shares, presence: true

    belongs_to :user

    belongs_to :stocks,
        primary_key: :symbol,
        foreign_key: :symbol,
        class_name: :Stock
end
