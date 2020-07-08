class Watchlist < ApplicationRecord
    validates :title, presence: true, uniqueness: { scope: :user_id, message: "%{attribute} must be unique"}
    validates :title, presence: true, length: {minimum: 1}
end
