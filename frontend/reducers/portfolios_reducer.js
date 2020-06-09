import {RECEIVE_PORTFOLIO, REMOVE_PORTFOLIO} from '../actions/portfolio_actions';

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