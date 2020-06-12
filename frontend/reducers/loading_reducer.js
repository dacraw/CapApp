import {START_LOADING_STOCK, RECEIVE_STOCK} from '../actions/stock_actions'

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case START_LOADING_STOCK:
            return true     
        case RECEIVE_STOCK:
            return false  
        default:
            return state
    }
}