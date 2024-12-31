class CompanyAbout < ApplicationRecord
    belongs_to :stock
    validates_presence_of :data
end