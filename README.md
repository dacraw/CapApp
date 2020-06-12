# README

![alt text][logo]

[logo]: https://github.com/dacrawford89/CapApp/blob/master/app/assets/images/logo.png "Cap App"

# CapApp (https://cap-app1000.herokuapp.com/#/)
- Monitor and track stocks and see their daily performance via portfolio and graphs. Buy or sell an investment and use it to get an idea of how to daytrade or save.

### Rails version
- `5.2.4`
### Ruby version
- `2.5.1`
### React version
- `16.13.1`
### Redux version
- `4.0.5`

### Overview of Technologies
Rails manages the backend, `frontend/` contains react/redux data. An api key is required for this (please see "Configuration below" and the `figaro` gem is used to hide the key on the backend. Controllers are setup to fetch info from the IEX Cloud API, using the `ENV['TEST_IEX_KEY']` value. `recharts` v `1.8.5` is used to display chart data once retrieved.

### Configuration
1. run `bundle install`
2. run `npm install`
3. run `bundle exec rails db:setup`
4. you will need an [IEX Cloud](https://iexcloud.io/cloud-login#/register/) test key to fetch stock prices.
  - run `bundle exec figaro install` to generate an `application.yml` and store your IEX key here with key name `TEST_IEX_KEY`. This is what will be used in API calls within `app/views/stocks`.
5. (optional) run `npm run webpack` to watch webpack

note: I am not affiliated with IEX Cloud.

### Features
- Secure authentication
- Invest in mock stock market
- Store portfolios
- Search stocks
- Browse stock symbol info before purchase
- Monitor specific stocks

## Buy/Sell Stocks
Upon login, user is redirected to `/stocks/goog` which provides a baseline for the investment tool. Use the search bar to browse other stock symbols by symbol or by company name. The search feature will highlight the matching text from the search in the results.


