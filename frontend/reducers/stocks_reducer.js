import {RECEIVE_STOCK} from '../actions/stock_actions'
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
        default:
            return state;
    }
}