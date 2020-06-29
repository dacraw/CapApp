# @portfolio represents a collection of items matching user_id

# {
#     1: {
#         portfolio: []
#     }
# }


json.set! @portfolio.first.user_id do
    json.cashAvailable number_to_currency(@portfolio.first.user.cash_available)

    portfolioValue = 0
    json.ownedStocks do
        @portfolio.each do |item|
            json.set! item.symbol do
                json.symbol item.symbol
                json.num_shares item.num_shares 
            end
        end
        # portfolioValue += item.
    end
    # json.portfolioValue 
end
