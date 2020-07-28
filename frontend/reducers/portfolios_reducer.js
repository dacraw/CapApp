import {RECEIVE_PORTFOLIO, REMOVE_PORTFOLIO, CLEAR_SUCCESS, START_LOADING_PORTFOLIOS, RECEIVE_PORTFOLIOS} from '../actions/portfolio_actions';
import {merge} from 'lodash'
import {LOGOUT_CURRENT_USER} from '../actions/session_actions'
const _nullState = {
    id: null,
    portfolio: null,
}

export default (state = {}, action) => {
    let nextState;
    switch (action.type) {
        case RECEIVE_PORTFOLIO:
            nextState = merge({}, state, action.portfolio);
            nextState['cashAvailable'] = action.portfolio.cashAvailable;
            nextState.stocks = merge({}, action.portfolio.stocks);
            Object.values(nextState.stocks).forEach(stock => !(stock.symbol in action.portfolio.stocks) ? delete nextState.stocks[stock.symbol] : null )
            nextState['portfolioValue'] += state.portfolioValue;
            // nextState['history'] = merge({}, action.portfolio.history)
            return nextState
        case REMOVE_PORTFOLIO:
            return _nullState;
        case RECEIVE_PORTFOLIOS:
            return merge(
                {},
                state,
                action.portfolios
            )   
        case LOGOUT_CURRENT_USER:
            return _nullState;
        default:
            return state;
    }
};