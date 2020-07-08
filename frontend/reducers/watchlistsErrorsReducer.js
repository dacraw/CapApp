import {RECEIVE_WATCHLIST_ERRORS, RECEIVE_SINGLE_WATCHLIST, CLEAR_WATCHLIST_ERRORS} from '../actions/watchlistActions'
import _ from 'lodash'

const _null = {};

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_WATCHLIST_ERRORS:
            return _.merge({}, action.errors)
        case RECEIVE_SINGLE_WATCHLIST:
            return _null
        case CLEAR_WATCHLIST_ERRORS:
            return _null
        default:
            return state
    }
};