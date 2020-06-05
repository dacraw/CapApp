import DashNavBar from './dash_nav_bar';
import {connect} from 'react-redux';
import {logout} from '../../actions/session_actions.js';
import {fetchPortfolio} from '../../actions/portfolio_actions'

const mapStateToProps = ({session, entities: { users }}) => {
    
    return {
        currentUser: users[session.id],
        cashAvailable: users[session.id].cashAvailable,
    };
};

const mapDispatchToProps = dispatch => {
    
    return {
        logout: () => dispatch(logout()),
        fetchPortfolio: userId => dispatch(fetchPortfolio(userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashNavBar);