import {RECEIVE_ALL_WATCHLISTS, RECEIVE_SINGLE_WATCHLIST} from '../actions/watchlistActions'
import _ from 'lodash'

const _null = [];

export default (state = _null, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ALL_WATCHLISTS:
            debugger
            return _.merge([], state, action.watchlists);
        case RECEIVE_SINGLE_WATCHLIST:
            debugger
            let nextState = _.cloneDeep(state);
            nextState.unshift(action.watchlist);
            return nextState
        default:
            return state
    }
}