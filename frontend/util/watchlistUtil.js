export const fetchAllWatchlists = () => {
    return $.ajax({
        url: '/api/watchlists'
    })
}

export const createWatchlist = watchlist => {
    return $.ajax({
        url: '/api/watchlists',
        method: 'POST',
    })
}