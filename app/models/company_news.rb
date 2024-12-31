class CompanyNews < ApplicationRecord
    belongs_to :stock
    validates_presence_of :data

    def self.fetch_data stock
        @uri = URI.parse("http://newsapi.org/v2/everything?qInTitle=#{stock.company}&sortBy=popularity&apiKey=#{ENV['NEWS_API_KEY']}&pageSize=5")
        @response = Net::HTTP.get_response(@uri)
        @parse = JSON.parse(@response.body)['articles']

        CompanyNews.create(
            stock: stock,
            # some articles can have a "removed" status, let's exclude them
            data: @parse.reject {|article| article["url"] == "https://removed.com"}
        )
    end
end