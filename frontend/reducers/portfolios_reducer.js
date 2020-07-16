import {RECEIVE_PORTFOLIO, REMOVE_PORTFOLIO, CLEAR_SUCCESS, START_LOADING_PORTFOLIOS} from '../actions/portfolio_actions';

const _nullState = {
    id: null,
    portfolio: null,
}

export default (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_PORTFOLIO:
            return Object.assign({}, { [action.portfolio.id]: action.portfolio })
        case REMOVE_PORTFOLIO:
            return _nullState;
        default:
            return state;
    }
};