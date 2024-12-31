require 'net/http'
require 'uri'
require 'json'

class NewsAPI
    attr_reader :company, :uri, :response, :parse
    def initialize(company = "")
        @company = company
    end
    
    def fetch
        @uri = URI.parse("http://newsapi.org/v2/everything?qInTitle=#{@company}&sortBy=popularity&apiKey=#{ENV['NEWS_API_KEY']}&pageSize=5")
        @response = Net::HTTP.get_response(@uri)
        @parse = JSON.parse(@response.body)['articles']

        # some articles can have a "removed" status, let's exclude them
        @parse.reject {|article| article["url"] == "https://removed.com"}
    end

    def fetchBusiness
        @uri = URI.parse("https://newsapi.org/v2/top-headlines?category=business&country=us&apiKey=#{ENV['NEWS_API_KEY']}&pageSize=5")
        @response = Net::HTTP.get_response(@uri)
        @parse = JSON.parse(@response.body)['articles']
        
        # some articles can have a "removed" status, let's exclude them
        @parse.reject {|article| article["url"] == "https://removed.com"}
    end
end

