import Greeting from './greeting';
import {connect} from 'react-redux';
import {logout} from '../../actions/session_actions.js';

const mapStateToProps = ({session, entities: { users }}) => {
    return {
        currentUser: users[session.id]
    };
};

const mapDispatchToProps = dispatch => {
    // debugger;
    return {
        logout: () => dispatch(logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Greeting);