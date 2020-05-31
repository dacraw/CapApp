import Greeting from './greeting';
import {connect} from 'react-redux';
import {logout} from '../../actions/session_actions.js';

const mapDispatchToProps = dispatch => {
    // debugger;
    return ({
        logout: () => dispatch(logout())
    })
}

export default connect(null, mapDispatchToProps)(Greeting);