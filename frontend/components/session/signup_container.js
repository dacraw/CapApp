import {connect} from 'react-redux';
import Signup from './signup';
import {signup, CLEAR_SESSION_ERRORS, login} from '../../actions/session_actions'
import {createPortfolio} from '../../actions/portfolio_actions'


const mapStateToProps = state => ({
    errors: Object.values(state.errors.session),
});
const mapDispatchToProps = dispatch => {
    return ({
        submit: formUser => dispatch(signup(formUser)),
        createPortfolio: userId => dispatch(createPortfolio(userId)),
        clearErrors: () => dispatch({type: CLEAR_SESSION_ERRORS}),
        demoUser: () => dispatch(login({username:'demo@demo.com',password:'password'})),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);