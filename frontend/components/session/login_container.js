import {connect} from 'react-redux';
import Login from './login';
import {login} from '../../actions/session_actions'


const mapStateToProps = state => ({
    errors: Object.values(state.errors.session),
})
const mapDispatchToProps = dispatch => {
    return ({
        submit: formUser => dispatch(login(formUser)),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);