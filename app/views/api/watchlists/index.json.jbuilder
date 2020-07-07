@watchlists.each do |watchlist|
    json.set! watchlist.id do
        json.id watchlist.id
        json.title watchlist.title
    end
end