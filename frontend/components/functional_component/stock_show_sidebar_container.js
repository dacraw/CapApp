import {connect} from 'react-redux';
import StockShowSidebar from './stock_show_sidebar';
import {fetchStock} from '../../actions/stock_actions'

const mapStateToProps = ( {entities: { users}, session, stocks } ) => {
    return ({
        cashAvailable: users[session.id].cashAvailable,
    })
}

const mapDispatchToProps = dispatch => ({
    fetchStock: stockSymbol => dispatch(fetchStock(stockSymbol)),
})

export default connect(mapStateToProps, mapDispatchToProps)(StockShowSidebar)