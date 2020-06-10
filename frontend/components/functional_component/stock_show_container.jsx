import {connect} from 'react-redux';
import StockShow from './stock_show';
import {fetchStock} from '../../actions/stock_actions'

const mapStateToProps = ( {entities: { users, stocks}, session }, ownProps ) => {
    return ({
        cashAvailable: users[session.id].cashAvailable,
        stockSym: stocks[ownProps.match.params.symbol.toUpperCase()],
        stocks
    })
}

const mapDispatchToProps = dispatch => ({
    fetchStock: symbol => dispatch(fetchStock(symbol)),
})

export default connect(mapStateToProps, mapDispatchToProps)(StockShow)