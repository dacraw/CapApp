class CompanyAbout < ApplicationRecord
    belongs_to :stock
    validates_presence_of :data


    def self.fetch_data(stock)
        aboutUri = URI.parse("https://api.polygon.io/v3/reference/tickers/#{stock.symbol}?apiKey=#{ENV['POLYGON_KEY']}")

        aboutResponse = Net::HTTP.get_response(aboutUri)

        CompanyAbout.create(
            stock: stock,
            data: aboutResponse.body
        )
    end
end