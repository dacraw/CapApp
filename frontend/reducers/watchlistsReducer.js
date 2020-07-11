import {RECEIVE_ALL_WATCHLISTS, RECEIVE_SINGLE_WATCHLIST} from '../actions/watchlistActions'
import {RECEIVE_WATCHED_STOCK} from '../actions/watchedStockActions'
import _ from 'lodash'

const _null = {};

export default (state = _null, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ALL_WATCHLISTS:
            return _.merge({}, state, action.watchlists);
        case RECEIVE_SINGLE_WATCHLIST:
            // let nextState = _.cloneDeep(state);
            // nextState.unshift(action.watchlist);
            // return nextState
        case RECEIVE_WATCHED_STOCK:
            debugger
            const nextState = _.merge({}, state);
            nextState[Object.keys(action.stock)[0]].watchedStocks.push(Object.values(action.stock)[0].watchedStocks);
            return nextState
        default:
            return state
    }
}