import {connect} from 'react-redux'
import DashMainSidebar from './dash_main_sidebar'

const mapStateToProps = ({session, entities: {stocks, users, watchlists}, }) => {
    return ({
        stocks,
        user: users[session.id],
        watchlists
    })
}

export default connect(mapStateToProps)(DashMainSidebar)