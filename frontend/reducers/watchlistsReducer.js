import {RECEIVE_ALL_WATCHLISTS, RECEIVE_SINGLE_WATCHLIST} from '../actions/watchlistActions'
import _ from 'lodash'

const _null = [{
    id: "",
    title: "",
    stocks: [],
}];

export default (state = _null, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ALL_WATCHLISTS:
            return _.merge({}, state, action.watchlists)
        case RECEIVE_SINGLE_WATCHLIST:
            return _.merge({}, state, action.watchlist)         
        default:
            return state
    }
}