class DailyStockQuote < ApplicationRecord
    validates_presence_of :date_start, :date_end, :data
    
    belongs_to :stock
end
