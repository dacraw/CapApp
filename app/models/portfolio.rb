class Portfolio < ApplicationRecord
    validates :user_id, presence: true, uniqueness: true
    validates :cash_available, presence: true

    belongs_to :user
end
