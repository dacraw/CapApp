import * as StockUtil from '../util/stock_util'

export const RECEIVE_STOCK = 'RECEIVE_STOCK';
export const RECEIVE_STOCKS = 'RECEIVE_STOCKS';
export const RECEIVE_STOCK_ERRORS = 'RECEIVE_STOCK_ERRORS';
export const START_LOADING_STOCK = 'START_LOADING_STOCK';



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

const startLoadingStock = () => ({
    type: START_LOADING_STOCK,
})



export const fetchStock = stockSymbol => dispatch => {
    dispatch(startLoadingStock());
    return StockUtil.fetchStock(stockSymbol)
        .then(
            stock => dispatch(receiveStock(stock)),
            errs => dispatch(receiveStockErrors(errs.responseText))
        )
}

export const fetchStocks = () => dispatch => (
    StockUtil.fetchStocks()
        .then(
            stocks => dispatch(receiveStocks(stocks)),
            errs => dispatch(receiveStockErrors(errs))
        )
)


