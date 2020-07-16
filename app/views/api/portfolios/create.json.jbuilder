json.set! @portfolio.id do
    json.extract! @portfolio, :id, :user_id, :symbol, :num_shares, :created_at
end