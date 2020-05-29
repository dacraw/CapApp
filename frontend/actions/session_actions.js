import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';

const receiveCurrentUser = user => {
    return ({
        type: RECEIVE_CURRENT_USER,
        user
    })
}

const receiveSessionErrors = errors => {
    return ({
        type: RECEIVE_SESSION_ERRORS,
        errors
    })
}

const logoutCurrentUser = () => {
    return ({
        type: LOGOUT_CURRENT_USER,
    })
}

export const login = formUser => dispatch => {
    return APIUtil.login(formUser)
        .then(
            user => dispatch(receiveCurrentUser(user)), 
            errs => dispatch(receiveSessionErrors(errs))
        )
}

export const signup = formUser => dispatch => {
    return APIUtil.signup(formUser)
        .then(
            user => dispatch(receiveCurrentUser(user)), 
            errs => dispatch(receiveSessionErrors(errs))
        )
}

export const logout = () => dispatch => {
    return APIUtil.logout()
        .then(
            () => dispatch(logoutCurrentUser()))
}