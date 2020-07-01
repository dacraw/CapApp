import {RECEIVE_STOCK, RECEIVE_STOCKS} from '../actions/stock_actions'
import {LOGOUT_CURRENT_USER} from '../actions/session_actions'
import {merge} from 'lodash'

const _nullState = {}

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
            
            return merge({}, state, action.stocks)
        case LOGOUT_CURRENT_USER:
            return _nullState
        default:
            return state;
    }
}