import {connect} from 'react-redux';
import Signup from './signup';
import {signup} from '../../actions/session_actions'


const mapStateToProps = state => ({
    errors: Object.values(state.errors.session),
});

const mapDispatchToProps = dispatch => {
    return ({
        submit: formUser => dispatch(signup(formUser))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);