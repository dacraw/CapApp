require_relative '../shared/news_api'

news_API = NewsAPI.new
business_news = news_API.fetchBusiness

json.array! business_news do |business_news_item|
    
    json.source business_news_item['source']
    json.content business_news_item['content']
    json.description business_news_item['description']
    json.title business_news_item['title']
    json.url business_news_item['url']
    json.urlToImage business_news_item['urlToImage']
end
