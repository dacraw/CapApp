import {START_LOADING_STOCK, RECEIVE_STOCK} from '../actions/stock_actions'
import {START_LOADING_NEWS, RECEIVE_NEWS} from '../actions/newsActions'
import {START_LOADING_WATCHLIST, RECEIVE_SINGLE_WATCHLIST} from '../actions/watchlistActions'

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case START_LOADING_STOCK:
            return true     
        case RECEIVE_STOCK:
            return false  
        case START_LOADING_NEWS:
            return true
        case RECEIVE_NEWS:
            return false
        case START_LOADING_WATCHLIST:
            return true
        case RECEIVE_SINGLE_WATCHLIST:
            return false
        default:
            return state
    }
}