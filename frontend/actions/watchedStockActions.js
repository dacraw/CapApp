import * as WSU from '../util/watchedStocksUtil'

export const RECEIVE_WATCHED_STOCK = "RECEIVE_WATCHED_STOCK";

const receiveWatchedStock = stock => ({
    type: RECEIVE_WATCHED_STOCK,
    stock
});

export const createWatchedStock = stock => dispatch => {
    return WSU.createWatchedStock(stock)
        .then(
            res => dispatch(receiveWatchedStock(res))
        )
};