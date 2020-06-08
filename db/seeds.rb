# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

demo = User.create!({username: 'demo2@demo.demo', password:'password', fname:'demo', lname:'demo', cash_available: 10000.00})

Stock.create!({symbol: 'MSFT'})
Stock.create!({symbol: 'AAPL'})
Stock.create!({symbol: 'AMZN'})
Stock.create!({symbol: 'FB'})
Stock.create!({symbol: 'GOOG'})
Stock.create!({symbol: 'JNJ'})
Stock.create!({symbol: 'BRK.B'})
Stock.create!({symbol: 'JPM'})
Stock.create!({symbol: 'V'})
Stock.create!({symbol: 'PG'})
Stock.create!({symbol: 'UNH'})
Stock.create!({symbol: 'INTC'})
Stock.create!({symbol: 'HD'})
Stock.create!({symbol: 'MA'})
Stock.create!({symbol: 'VZ'})
Stock.create!({symbol: 'T'})
Stock.create!({symbol: 'DIS'})
Stock.create!({symbol: 'BAC'})
Stock.create!({symbol: 'NVDA'})
Stock.create!({symbol: 'XOM'})
Stock.create!({symbol: 'MRK'})
Stock.create!({symbol: 'PFE'})
Stock.create!({symbol: 'CSCO'})
Stock.create!({symbol: 'CMCSA'})
Stock.create!({symbol: 'ADBE'})
Stock.create!({symbol: 'KO'})
Stock.create!({symbol: 'PE'})
Stock.create!({symbol: 'CVX'})
Stock.create!({symbol: 'NFLX'})
Stock.create!({symbol: 'PYPL'})
Stock.create!({symbol: 'WMT'})
Stock.create!({symbol: 'ABBV'})
Stock.create!({symbol: 'ABT'})
Stock.create!({symbol: 'CRM'})
Stock.create!({symbol: 'MCD'})
Stock.create!({symbol: 'BMY'})
Stock.create!({symbol: 'TMO'})
Stock.create!({symbol: 'COST'})
Stock.create!({symbol: 'AMGN'})
Stock.create!({symbol: 'MDT'})
Stock.create!({symbol: 'ACN'})
Stock.create!({symbol: 'LLY'})
Stock.create!({symbol: 'NKE'})
Stock.create!({symbol: 'NEE'})
Stock.create!({symbol: 'AVGO'})
Stock.create!({symbol: 'UNP'})
Stock.create!({symbol: 'C'})
Stock.create!({symbol: 'TXN'})
Stock.create!({symbol: 'PM'})
Stock.create!({symbol: 'TSLA'})

Portfolio.create!(user_id: 13, symbol: 'MSFT', num_shares: 12.5)
Portfolio.create!(user_id: 13, symbol: 'AAPL', num_shares: 78.2)
Portfolio.create!(user_id: 13, symbol: 'GOOG', num_shares: 182.7)
Portfolio.create!(user_id: 13, symbol: 'FB', num_shares: 815)