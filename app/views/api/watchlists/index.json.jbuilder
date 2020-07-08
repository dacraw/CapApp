@watchlists.each do |watchlist|
    json.partial! 'watchlist', watchlist: watchlist
end