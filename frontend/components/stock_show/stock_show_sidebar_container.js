import {connect} from 'react-redux';
import StockShowSidebar from './stock_show_sidebar';
import {fetchStocks} from '../../actions/stock_actions'
import {createPortfolio, updatePortfolio} from '../../actions/portfolio_actions'

const mapStateToProps = ( { loading: {portfolioLoader }, entities: { users, stocks, portfolios}, session, errors }, ownProps) => {
    return ({
        userInfo: users[session.id],
        stock: stocks[ownProps.match.params.symbol.toUpperCase()],
        currentUser: session.id,
        stocks: stocks,
        errors: errors.session,
        portfolios,
        portfolioLoader,
    })
}

const mapDispatchToProps = dispatch => ({
    fetchStocks: () => dispatch(fetchStocks()),
    createPortfolio: userStock => dispatch(createPortfolio(userStock)),
    updatePortfolio: portfolio => dispatch(updatePortfolio(portfolio)),
    clearMessages: () => dispatch({type:"CLEAR_MESSAGES"}),
})

export default connect(mapStateToProps, mapDispatchToProps)(StockShowSidebar)