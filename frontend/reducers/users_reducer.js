import {
    RECEIVE_CURRENT_USER,
    LOGOUT_CURRENT_USER,
} from '../actions/session_actions';
import { RECEIVE_PORTFOLIO, RECEIVE_PORTFOLIOS } from '../actions/portfolio_actions';
import {merge} from 'lodash'

const _nullState = {

}

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return merge(
                {}, 
                state, 
                { [action.user.id]: action.user })
        case RECEIVE_PORTFOLIO:
                        
            return merge({}, state, action.portfolio);

        case LOGOUT_CURRENT_USER:
            return _nullState;
        default:
            return state;
    }
}