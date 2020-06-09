import {connect} from 'react-redux';
import StockShowSidebar from './stock_show_sidebar';
import {fetchStocks} from '../../actions/stock_actions'
import {createPortfolio, updatePortfolio} from '../../actions/portfolio_actions'

const mapStateToProps = ( { entities: { users, stocks}, session, errors }, ownProps) => {
    return ({
        userInfo: users[session.id],
        stock: stocks[ownProps.match.params.symbol.toUpperCase()],
        currentUser: session.id,
        stocks: stocks,
        errors: errors.session
    })
}

const mapDispatchToProps = dispatch => ({
    fetchStocks: () => dispatch(fetchStocks()),
    createPortfolio: userStock => dispatch(createPortfolio(userStock)),
    updatePortfolio: portfolio => dispatch(updatePortfolio(portfolio))
})

export default connect(mapStateToProps, mapDispatchToProps)(StockShowSidebar)