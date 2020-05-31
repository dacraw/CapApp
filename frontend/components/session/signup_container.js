import {connect} from 'react-redux';
import SessionForm from './session_form';
import {signup} from '../../actions/session_actions';

const mapStateToProps = state => {
    return ({
        errors: state.errors,
        formType: "Signup!",
    })
};

const mapDispatchToProps = dispatch => {
    return ({
        action: formUser => dispatch(signup(formUser)) 
    })
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);


