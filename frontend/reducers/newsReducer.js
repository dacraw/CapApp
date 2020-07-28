import {merge} from 'lodash'
import {RECEIVE_NEWS} from '../actions/newsActions'
import {LOGOUT_CURRENT_USER} from '../actions/session_actions'

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_NEWS:
            return merge({}, state, action.news)
        case LOGOUT_CURRENT_USER:
            return ({})
        default:
            return state
    }
}