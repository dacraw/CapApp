import {connect} from 'react-redux';
import Dashboard from './main'
import {fetchBusinessNews} from '../../actions/newsActions'

const mapStateToProps = ({session, entities: {stocks, users, news}, loading: {stockLoader}}) => {
    return ({
        stocks,
        user: users[session.id],
        stockLoader,
        news
    })
}
const mapDispatchToProps = dispatch => {
    return ({
        fetchBusinessNews: () => dispatch(fetchBusinessNews()),
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)