import {
    RECEIVE_CURRENT_USER,
} from '../actions/session_actions';
import { RECEIVE_PORTFOLIO, RECEIVE_PORTFOLIOS } from '../actions/portfolio_actions';
import {merge} from 'lodash'

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return merge(
                {}, 
                state, 
                { [action.user.id]: action.user })
        case RECEIVE_PORTFOLIO:

            const nextState = merge({}, state);
            nextState[action.portfolio.user_id]['stocks'].push(action.portfolio.symbol);
            return nextState;
        case RECEIVE_PORTFOLIOS:
            
            return _.merge(
                {},
                state,
                action.portfolios
            )   
        default:
            return state;
    }
}