export const fetchAllWatchlists = () => {
    return $.ajax({
        url: '/api/watchlists'
    })
}

export const createWatchlist = watchlist => {
    return $.ajax({
        url: '/api/watchlists',
        method: 'POST',
        data: { watchlist },
    })
}

export const deleteWatchlist = watchlistID => {
    return $.ajax({
        url: `/api/watchlists/${watchlistID}`,
        method: 'DELETE',
    })
}