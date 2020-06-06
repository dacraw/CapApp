import {RECEIVE_STOCK, RECEIVE_STOCKS} from '../actions/stock_actions'
import {merge} from 'lodash'
import sampleStocks from './sample_stock_index'

export default (state = {}, action) => {
    // debugger
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_STOCK:
            return merge(
                {},
                state,
                action.stock
            ) 
        case RECEIVE_STOCKS:

            // use sample stocks while developing
            return sampleStocks;
            // return action.stocks
        default:
            return state;
    }
}