json.array! @watchlists do |watchlist|
    # debugger
    json.partial! 'watchlist', watchlist: watchlist
end