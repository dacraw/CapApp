# @portfolio represents a collection of items matching user_id

# {
#     1: {
#         portfolio: []
#     }
# }


json.set! @portfolio.first.user_id do
    json.stocks @portfolio.map {|item| item.symbol } 
end
