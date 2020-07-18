import {connect} from 'react-redux'
import DashMainSidebar from './dash_main_sidebar'

const mapStateToProps = ({session, entities: {stocks, users, watchlists, portfolios}, }) => {
    return ({
        stocks,
        user: users[session.id],
        watchlists,
        portfolios,
    })
}

export default connect(mapStateToProps)(DashMainSidebar)