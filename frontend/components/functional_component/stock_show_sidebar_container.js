import {connect} from 'react-redux';
import StockShowSidebar from './stock_show_sidebar';
import {fetchStocks} from '../../actions/stock_actions'
import {createPortfolio} from '../../actions/portfolio_actions'

const mapStateToProps = ( {entities: { users, stocks}, session }, ownProps ) => {
    return ({
        cashAvailable: users[session.id].cashAvailable,
        stock: stocks[ownProps.match.params.symbol.toUpperCase()],
        currentUser: session.id
    })
}

const mapDispatchToProps = dispatch => ({
    fetchStocks: () => dispatch(fetchStocks()),
    submit: userStock => dispatch(createPortfolio(userStock))
})

export default connect(mapStateToProps, mapDispatchToProps)(StockShowSidebar)