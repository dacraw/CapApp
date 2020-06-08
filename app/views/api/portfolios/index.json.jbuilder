# @portfolio represents a collection of items matching user_id

# {
#     1: {
#         portfolio: []
#     }
# }

# debugger
json.set! @portfolio.first.user_id do
    json.stocks do 
        json.array! @portfolio, :symbol, :num_shares 
    end
end
