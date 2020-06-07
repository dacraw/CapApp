import * as StockUtil from '../util/stock_util'

export const RECEIVE_STOCK = 'RECEIVE_STOCK';
export const RECEIVE_STOCKS = 'RECEIVE_STOCKS';
export const RECEIVE_STOCK_ERRORS = 'RECEIVE_STOCK_ERRORS';
export const RECEIVE_USER_STOCKS = 'RECEIVE_USER_STOCKS';

const receiveStock = stock => ({
    type: RECEIVE_STOCK,
    stock,
});

const receiveStocks = stocks => ({
    type: RECEIVE_STOCKS,
    stocks,
});

const receiveStockErrors = errors => ({
    type: RECEIVE_STOCK_ERRORS,
    errors,
})

const receiveUserStocks = userStocks => ({
    type: RECEIVE_USER_STOCKS,
    userStocks
})

export const fetchStock = stockSymbol => dispatch => (
    StockUtil.fetchStock(stockSymbol)
        .then(
            stock => dispatch(receiveStock(stock)),
            errs => dispatch(receiveStockErrors(errs))
        )
)

export const fetchStocks = () => dispatch => (
    StockUtil.fetchStocks()
        .then(
            stocks => dispatch(receiveStocks(stocks)),
            errs => dispatch(receiveStockErrors(errs))
        )
)

export const fetchUserStocks = () => dispatch => (
    StockUtil.fetchUserStocks()
        .then(
            stocks => dispatch(receiveUserStocks(stocks)),
            errs => dispatch(receiveStockErrors(errs))
        )
)
