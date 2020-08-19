require 'net/http'
require 'uri'
require 'json'

class NewsAPI
    attr_reader :company, :uri, :response, :parse
    def initialize(company = "")
        @company = company
    end
    
    def fetch
        @uri = URI.parse("http://newsapi.org/v2/everything?qInTitle=#{@company}&sortBy=popularity&apiKey=#{ENV['NEWS_API_KEY']}")
        # @uri = URI.parse("http://newsapi.org/v2/everything?q=#{@company}&from=2020-06-29&sortBy=popularity&apiKey=5c26c92dff4f467e84644baeb283abeb")
        @response = Net::HTTP.get_response(@uri)
        @parse = JSON.parse(@response.body)['articles']
        @parse
        # response
    end

    def fetchBusiness
        @uri = URI.parse("https://newsapi.org/v2/top-headlines?category=business&country=us&apiKey=#{ENV['NEWS_API_KEY']}")
        # @uri = URI.parse("http://newsapi.org/v2/everything?q=#{@company}&from=2020-06-29&sortBy=popularity&apiKey=5c26c92dff4f467e84644baeb283abeb")
        @response = Net::HTTP.get_response(@uri)
        @parse = JSON.parse(@response.body)['articles']
        @parse
    end
end

