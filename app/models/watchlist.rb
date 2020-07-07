class Watchlist < ApplicationRecord
    validates :user_id, presence: true, uniqueness: { scope: :title}
    validates :title, presence: true, length: {minimum: 1}
end
