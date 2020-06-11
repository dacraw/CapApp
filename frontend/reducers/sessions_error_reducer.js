import { 
    RECEIVE_SESSION_ERRORS,
    RECEIVE_CURRENT_USER,
    CLEAR_SESSION_ERRORS,
 } from '../actions/session_actions';
import {RECEIVE_STOCK_ERRORS, RECEIVE_STOCK} from '../actions/stock_actions'
import {RECEIVE_PORTFOLIO_ERRORS, RECEIVE_PORTFOLIO, CLEAR_MESSAGES} from '../actions/portfolio_actions'
import {merge} from 'lodash'

const _nullState = {
    errors: [],
}

export default (state = _nullState, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:
            return Object.assign({}, state, action.errors);
        case RECEIVE_STOCK_ERRORS:
            return merge({}, state, action.errors)
        case RECEIVE_PORTFOLIO_ERRORS:
            return merge({}, state, action.errors)
        case RECEIVE_CURRENT_USER:
            return _nullState;
        case RECEIVE_PORTFOLIO:
            return _nullState;
        case CLEAR_MESSAGES:
            return _nullState;
        case CLEAR_SESSION_ERRORS:
            return _nullState;
        case RECEIVE_STOCK:
            return _nullState;
        default:
            return state;
    }
}