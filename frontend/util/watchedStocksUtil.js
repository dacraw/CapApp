export const createWatchedStock = stock => {
    return $.ajax({
        type: 'POST',
        url: `/api/watched_stocks`,
        data: { stock }
    })
}