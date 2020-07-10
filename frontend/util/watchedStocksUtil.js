export const createWatchedStock = watched_stock => {
    return $.ajax({
        type: 'POST',
        url: `/api/watched_stocks`,
        data: { watched_stock }
    })
}