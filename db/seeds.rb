# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

demo_user = User.find_by_username('demo@demo.demo')
if demo_user
    demo_user.destroy
end

demo = User.create!({username: 'demo@demo.demo', password:'password', fname:'demo', lname:'demo', cash_available: 10000.00})

Stock.create({symbol: 'MSFT', company: 'Microsoft'})
Stock.create({symbol: 'AAPL', company: 'Apple'})
Stock.create({symbol: 'AMZN', company: 'Amazon'})
Stock.create({symbol: 'META', company: 'Facebook'})
Stock.create({symbol: 'GOOG', company: 'Google'})
Stock.create({symbol: 'JNJ', company: 'Johnson & Johnson'})
Stock.create({symbol: 'JPM', company: 'JPMorgan Chase'})
Stock.create({symbol: 'V', company: 'Visa'})
Stock.create({symbol: 'PG', company: 'Proctor & Gamble'})
Stock.create({symbol: 'UNH', company: 'UnitedHealth'})
Stock.create({symbol: 'INTC', company: 'Intel'})
Stock.create({symbol: 'HD', company: 'Home Depot'})
Stock.create({symbol: 'MA', company: 'Mastercard'})
Stock.create({symbol: 'VZ', company: 'Verizon'})
Stock.create({symbol: 'T', company: 'AT&T'})
Stock.create({symbol: 'DIS', company: 'Disney'})
Stock.create({symbol: 'BAC', company: 'Bank of America'})
Stock.create({symbol: 'NVDA', company: 'NVIDIA'})
Stock.create({symbol: 'XOM', company: 'Exxon Mobil'})
Stock.create({symbol: 'MRK', company: 'Merck'})
Stock.create({symbol: 'PFE', company: 'Pfizer'})
Stock.create({symbol: 'CSCO', company: 'Cisco'})
Stock.create({symbol: 'CMCSA', company: 'Comcast'})
Stock.create({symbol: 'ADBE', company: 'Adobe'})
Stock.create({symbol: 'KO', company: 'Coca-Cola'})
Stock.create({symbol: 'PE', company: 'Parsley Energy'})
Stock.create({symbol: 'CVX', company: 'Chevron'})
Stock.create({symbol: 'NFLX', company: 'Netflix'})
Stock.create({symbol: 'PYPL', company: 'Paypal'})
Stock.create({symbol: 'WMT', company: 'Walmart'})
Stock.create({symbol: 'ABBV', company: 'AbbVie'})
Stock.create({symbol: 'ABT', company: 'Abbott'})
Stock.create({symbol: 'CRM', company: 'Salesforce'})
Stock.create({symbol: 'MCD', company: 'McDonald\'s'})
Stock.create({symbol: 'BMY', company: 'Bristol-Meyers Squibb'})
Stock.create({symbol: 'TMO', company: 'Thermo Fisher Scientific'})
Stock.create({symbol: 'COST', company: 'Costco'})
Stock.create({symbol: 'AMGN', company: 'Amgen'})
Stock.create({symbol: 'MDT', company: 'Medtronic'})
Stock.create({symbol: 'ACN', company: 'Accenture'})
Stock.create({symbol: 'LLY', company: 'Eli Lilly'})
Stock.create({symbol: 'NKE', company: 'Nike'})
Stock.create({symbol: 'NEE', company: 'NextEra Energy'})
Stock.create({symbol: 'AVGO', company: 'Broadcom'})
Stock.create({symbol: 'UNP', company: 'Union Pacific'})
Stock.create({symbol: 'C', company: 'Citigroup'})
Stock.create({symbol: 'TXN', company: 'Texas Instruments'})
Stock.create({symbol: 'PM', company: 'Phillip Morris'})
Stock.create({symbol: 'TSLA', company: 'Tesla'})

Portfolio.create(user_id: demo.id, symbol: 'MSFT', num_shares: 12.5)
Portfolio.create(user_id: demo.id, symbol: 'AAPL', num_shares: 78.2)
Portfolio.create(user_id: demo.id, symbol: 'GOOG', num_shares: 182.7)
Portfolio.create(user_id: demo.id, symbol: 'FB', num_shares: 815)