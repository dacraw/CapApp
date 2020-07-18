import DashNavBar from './dash_nav_bar';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import {logout} from '../../actions/session_actions.js';
import {fetchPortfolios} from '../../actions/portfolio_actions'

const mapStateToProps = ({session, entities: { users, stocks, portfolios }}, ownProps) => {
  
    return {
        currentUser: users[session.id],
        cashAvailable: portfolios.cashAvailable,
        stocks,
        
    };
};

const mapDispatchToProps = dispatch => {
    
    return {
        logout: () => dispatch(logout()),
        fetchPortfolios: currentUser => dispatch(fetchPortfolios(currentUser)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashNavBar));