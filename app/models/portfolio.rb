class Portfolio < ApplicationRecord
    validates :user_id, presence: true, uniqueness: true
    validates :cash_available, presence: true

    belongs_to :user
    has_many :user_stocks
    has_many :stocks,
        through: :user_stocks,
        source: :stock
end
