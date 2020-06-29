import {connect} from 'react-redux';
import Dashboard from './main'

const mapStateToProps = ({session, entities: {stocks, users}, }) => {
    return ({
        stocks,
        user: users[session.id]
    })
}

export default connect(mapStateToProps)(Dashboard)