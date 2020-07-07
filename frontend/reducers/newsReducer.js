import {merge} from 'lodash'
import {RECEIVE_NEWS} from '../actions/newsActions'

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_NEWS:
            return merge({}, state, action.news)
        default:
            return state
    }
}