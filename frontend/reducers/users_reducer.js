import {
    RECEIVE_CURRENT_USER,
} from '../actions/session_actions';
import { RECEIVE_PORTFOLIO } from '../actions/portfolio_actions';
import {RECEIVE_USER_STOCKS} from '../actions/stock_actions'
import {merge} from 'lodash'

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign(
                {}, 
                state, 
                { [action.user.id]: action.user})
        case RECEIVE_PORTFOLIO:
            return _.merge(
                {},
                state,
                {
                    [action.portfolio.user_id]: {
                        cashAvailable: action.portfolio.cashAvailable,
                    }
                }
            )
        case RECEIVE_USER_STOCKS:
            return _.merge(
                {},
                state,
                action.user_stocks,
            )
        default:
            return state;
    }
}