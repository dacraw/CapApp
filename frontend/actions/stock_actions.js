import * as StockUtil from '../util/stock_util'



export const RECEIVE_STOCK = 'RECEIVE_STOCK';
export const RECEIVE_STOCK_ERRORS = 'RECEIVE_STOCK_ERRORS';

const receiveStock = stock => ({
    type: RECEIVE_STOCK,
    stock,
});

const receiveStockErrors = errors => ({
    type: RECEIVE_STOCK_ERRORS,
    errors,
})

export const fetchStock = stockSymbol => dispatch => (
    StockUtil.fetchStock(stockSymbol)
        .then(
            stock => dispatch(receiveStock(stock)),
            errs => dispatch(receiveStockErrors(errs))
        )
)