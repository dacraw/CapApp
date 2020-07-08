export const fetchAllWatchlists = () => {
    return $.ajax({
        url: '/api/watchlists'
    })
}

export const createWatchlist = watchlist => {
    debugger
    return $.ajax({
        url: '/api/watchlists',
        method: 'POST',
        data: { watchlist },
    })
}