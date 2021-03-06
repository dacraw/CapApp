import {connect} from 'react-redux'
import FunctionalComponent from './functional_component'
import {fetchStocks} from '../../actions/stock_actions'
import {fetchPortfolios} from '../../actions/portfolio_actions'


const mapStateToProps = ({session, loading: {stockLoader}, entities: { stocks }}) => {
    return ({
        currentUser: session.id,
        stockLoader,
        stocks
    })
}

const mapDispatchToProps = dispatch => {
    return ({
        fetchStocks: () => dispatch(fetchStocks()),
        fetchPortfolios: currentUser => dispatch(fetchPortfolios(currentUser)),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(FunctionalComponent);