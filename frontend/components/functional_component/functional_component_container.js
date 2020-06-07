import {connect} from 'react-redux'
import FunctionalComponent from './functional_component'
import {fetchStocks, fetchUserStocks} from '../../actions/stock_actions'


const mapStateToProps = (state) => {
    return ({
        currentUser: state.session.id,
    })
}

const mapDispatchToProps = dispatch => {
    return ({
        fetchStocks: () => dispatch(fetchStocks()),
        fetchUserStocks: () => dispatch(fetchUserStocks()),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(FunctionalComponent);