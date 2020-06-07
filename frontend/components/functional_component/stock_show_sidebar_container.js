import {connect} from 'react-redux';
import StockShowSidebar from './stock_show_sidebar';
import {fetchStocks, createUserStock} from '../../actions/stock_actions'

const mapStateToProps = ( {entities: { users, stocks}, session }, ownProps ) => {
    return ({
        cashAvailable: users[session.id].cashAvailable,
        stock: stocks[ownProps.match.params.symbol.toUpperCase()],
    })
}

const mapDispatchToProps = dispatch => ({
    fetchStocks: () => dispatch(fetchStocks()),
    submit: userStock => dispatch(createUserStock(userStock))
})

export default connect(mapStateToProps, mapDispatchToProps)(StockShowSidebar)