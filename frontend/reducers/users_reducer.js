import {
    RECEIVE_CURRENT_USER,
} from '../actions/session_actions';
import { RECEIVE_PORTFOLIO } from '../actions/portfolio_actions';
import {merge} from 'lodash'

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign(
                {}, 
                state, 
                { [action.user.id]: {
                    id: action.user.id,
                    username: action.user.username,
                }})
        case RECEIVE_PORTFOLIO:
            return _.merge(
                {},
                state,
                {
                    [action.portfolio.user_id]: {
                        cashAvailable: action.portfolio.cash_available,
                    }
                }
            )
        default:
            return state;
    }
}