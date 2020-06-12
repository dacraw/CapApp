import {connect} from 'react-redux'
import DashMainSidebar from './dash_main_sidebar'

const mapStateToProps = ({session, entities: {stocks, users}, }) => {
    return ({
        stocks,
        user: users[session.id]
    })
}

export default connect(mapStateToProps)(DashMainSidebar)