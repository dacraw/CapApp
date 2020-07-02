require_relative '../shared/news_api'

news_API = NewsAPI.new
business_news = news_api.fetchBusiness

json.news business_news
