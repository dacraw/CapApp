import {connect} from 'react-redux';
import Dashboard from './main'

const mapStateToProps = ({session, entities: {stocks, users}, loading: {stockLoader}}) => {
    return ({
        stocks,
        user: users[session.id],
        stockLoader
    })
}

export default connect(mapStateToProps)(Dashboard)