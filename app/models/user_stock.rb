class UserStock < ApplicationRecord
    # only one :stock_id per :portfolio_id, since stock shares should increase for multiple stocks
    validates :portfolio_id, uniqueness: { scope: :stock_id }, presence: true
    validates :stock_id, presence: true
    validates :num_shares, presence: true

    belongs_to :portfolio
    belongs_to :stock
end
