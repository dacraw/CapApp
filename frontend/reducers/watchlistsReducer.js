import {RECEIVE_ALL_WATCHLISTS, RECEIVE_SINGLE_WATCHLIST, REMOVE_SINGLE_WATCHLIST} from '../actions/watchlistActions'
import {RECEIVE_WATCHED_STOCK, REMOVE_WATCHED_STOCK} from '../actions/watchedStockActions'
import _ from 'lodash'

const _null = {};

export default (state = _null, action) => {
    Object.freeze(state);
    let nextState
    switch (action.type) {
        case RECEIVE_ALL_WATCHLISTS:
            return _.merge({}, state, action.watchlists);
        case RECEIVE_SINGLE_WATCHLIST:
            return _.merge({}, state, action.watchlist)   
        case RECEIVE_WATCHED_STOCK:
            return _.merge({}, state, action.stock)
        case REMOVE_WATCHED_STOCK:
            nextState = _.merge({}, state)
            const watchlistID = Object.keys(action.watchedStock)[0]
            const watchedStockID = Object.keys(action.watchedStock[watchlistID].watchedStocks)[0]
            delete nextState[watchlistID].watchedStocks[watchedStockID]
            return nextState
            // const watchlist = nextState
        case REMOVE_SINGLE_WATCHLIST:
            nextState = _.merge({}, state)
            delete nextState[action.watchlistID]
            return nextState
        default:
            return state
    }
}