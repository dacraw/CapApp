import {RECEIVE_PORTFOLIO, REMOVE_PORTFOLIO, CLEAR_SUCCESS, START_LOADING_PORTFOLIOS, RECEIVE_PORTFOLIOS} from '../actions/portfolio_actions';
import {merge} from 'lodash'
const _nullState = {
    id: null,
    portfolio: null,
}

export default (state = {}, action) => {
    let nextState;
    switch (action.type) {
        case RECEIVE_PORTFOLIO:
            nextState = merge({}, state)
            nextState['portfolioValue'] += action.portfolio.portfolioValue
            return merge({}, state, nextState)
        case REMOVE_PORTFOLIO:
            return _nullState;
        case RECEIVE_PORTFOLIOS:
            return merge(
                {},
                state,
                action.portfolios
            )   
        default:
            return state;
    }
};