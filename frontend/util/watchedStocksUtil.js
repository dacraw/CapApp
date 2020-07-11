export const createWatchedStock = watched_stock => {
    return $.ajax({
        type: 'POST',
        url: `/api/watched_stocks`,
        data: { watched_stock }
    })
};

export const deleteWatchedStock = watchedStockID => {
    debugger
    return $.ajax({
        type: 'DELETE',
        url: `/api/watched_stocks/${watchedStockID}`,
    })
}