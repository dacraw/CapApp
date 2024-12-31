class TopHeadlineNews < ApplicationRecord
    validates_presence_of :data

    def self.fetch_data
        most_recent_top_headline_news = TopHeadlineNews.order(created_at: :desc).limit(1).take

        if (most_recent_top_headline_news.present? && Time.now - most_recent_top_headline_news.created_at.utc > 6.hours) || most_recent_top_headline_news.blank?
            @uri = URI.parse("https://newsapi.org/v2/top-headlines?category=business&country=us&apiKey=#{ENV['NEWS_API_KEY']}&pageSize=5")
            @response = Net::HTTP.get_response(@uri)
            @parse = JSON.parse(@response.body)['articles']
    
            most_recent_top_headline_news = TopHeadlineNews.create(
                # some articles can have a "removed" status, let's exclude them
                data: @parse.reject {|article| article["url"] == "https://removed.com"}        
            )
        end
        
        most_recent_top_headline_news
    end
end