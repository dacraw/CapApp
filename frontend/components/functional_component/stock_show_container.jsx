import {connect} from 'react-redux';
import StockShow from './stock_show';
import {fetchStocks} from '../../actions/stock_actions'

const mapStateToProps = ( {entities: { users, stocks}, session }, ownProps ) => {
    return ({
        cashAvailable: users[session.id].cashAvailable,
        stock: stocks[ownProps.match.params.symbol.toUpperCase()],
    })
}

const mapDispatchToProps = dispatch => ({
    fetchStocks: () => dispatch(fetchStocks()),
})

export default connect(mapStateToProps, mapDispatchToProps)(StockShow)