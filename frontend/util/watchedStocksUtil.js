export const createWatchedStock = stockID => {
    return $.ajax({
        type: 'POST',
        url: `/api/watched_stocks`,
        data: { stockID }
    })
}