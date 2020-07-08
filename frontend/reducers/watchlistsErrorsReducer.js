import {RECEIVE_WATCHLIST_ERRORS} from '../actions/watchlistActions'
import _ from 'lodash'

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_WATCHLIST_ERRORS:
            return _.merge({}, action.errors)
        default:
            return state
    }
};