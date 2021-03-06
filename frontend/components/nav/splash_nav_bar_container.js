import SplashNavBar from './splash_nav_bar';
import {connect} from 'react-redux';
import {logout} from '../../actions/session_actions.js';

const mapStateToProps = ({session, entities: { users }}, ownProps) => {
    
    return {
        currentUser: users[session.id]
    };
};

const mapDispatchToProps = dispatch => {
    
    return {
        logout: () => dispatch(logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashNavBar);