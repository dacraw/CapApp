import {RECEIVE_STOCK, RECEIVE_STOCKS} from '../actions/stock_actions'
import {merge} from 'lodash'


export default (state = {}, action) => {
    
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_STOCK:
            
            return merge(
                {},
                state,
                action.stock
            ) 
        case RECEIVE_STOCKS:
            // using stock data 
            
            return merge(action.stocks)
        default:
            return state;
    }
}