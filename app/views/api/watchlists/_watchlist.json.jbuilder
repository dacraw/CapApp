json.set! watchlist.id do
    json.extract! watchlist, :id, :title, :updated_at
end
