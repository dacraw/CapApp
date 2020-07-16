import {connect} from 'react-redux';
import Dashboard from './main'
import {fetchBusinessNews} from '../../actions/newsActions'

const mapStateToProps = ({session, entities: {stocks, users, news, portfolios}, loading: {stockLoader}}) => {
    return ({
        stocks,
        user: users[session.id],
        stockLoader,
        portfolios,
        news
    })
}
const mapDispatchToProps = dispatch => {
    return ({
        fetchBusinessNews: () => dispatch(fetchBusinessNews()),
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)