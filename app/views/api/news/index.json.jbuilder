require_relative '../shared/news_api'

news_API = NewsAPI.new
business_news = news_API.fetchBusiness

json.news business_news
