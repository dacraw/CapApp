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
            debugger            
            return merge({}, state, action.portfolio);
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