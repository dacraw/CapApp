import * as WSU from '../util/watchedStocksUtil'

export const RECEIVE_WATCHED_STOCK = "RECEIVE_WATCHED_STOCK";
export const REMOVE_WATCHED_STOCK = "REMOVE_WATCHED_STOCK";

const receiveWatchedStock = stock => ({
    type: RECEIVE_WATCHED_STOCK,
    stock
});

const removeWatchedStock = watchedStockID => ({
    type: REMOVE_WATCHED_STOCK,
    watchedStockID
});

export const createWatchedStock = watched_stock => dispatch => {
    return WSU.createWatchedStock(watched_stock)
        .then(
            res => dispatch(receiveWatchedStock(res))
        )
};

export const deleteWatchedStock = watchedStockID => dispatch => {
    return WSU.deleteWatchedStock(watchedStockID)
        .then(
            () => dispatch(receiveWatchedStock(watchedStockID))
        )
};