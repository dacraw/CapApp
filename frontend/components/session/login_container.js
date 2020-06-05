import {connect} from 'react-redux';
import Login from './login';
import {login, CLEAR_SESSION_ERRORS} from '../../actions/session_actions'


const mapStateToProps = state => ({
    errors: Object.values(state.errors.session),
});
const mapDispatchToProps = dispatch => {
    return ({
        submit: formUser => dispatch(login(formUser)),
        clearErrors: () => dispatch({type: CLEAR_SESSION_ERRORS}),
        demoUser: () => dispatch(login({username:'demo@demo.com',password:'password'}))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);