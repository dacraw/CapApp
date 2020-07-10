class Watchlist < ApplicationRecord
    validates :title, 
    presence: {message: "%{attribute} must be present"}, 
    uniqueness: { scope: :user_id, message: "%{attribute} must be unique"},
    length: {minimum: 1, message: "%{attribute} must be at least 1 character long"}

    has_many :watched_stocks
    belongs_to :user
end
