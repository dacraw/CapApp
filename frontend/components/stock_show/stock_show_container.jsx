import {connect} from 'react-redux';
import StockShow from './stock_show';
import {fetchStock} from '../../actions/stock_actions'

const mapStateToProps = ( {loading, entities: { users, stocks}, session }, ownProps ) => {
    debugger
    return ({
        cashAvailable: users[session.id].cashAvailable,
        stockSym: stocks[ownProps.match.params.symbol.toUpperCase()],
        stocks,
        loading,
    })
}

const mapDispatchToProps = dispatch => ({
    fetchStock: symbol => dispatch(fetchStock(symbol)),
})

export default connect(mapStateToProps, mapDispatchToProps)(StockShow)