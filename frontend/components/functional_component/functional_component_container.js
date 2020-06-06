import {connect} from 'react-redux'
import FunctionalComponent from './functional_component'
import {fetchStocks, RECEIVE_STOCKS} from '../../actions/stock_actions'



const mapStateToProps = (state) => {
    return ({
        currentUser: state.session.id,
    })
}

const mapDispatchToProps = dispatch => {
    return ({
        fetchStocks: () => dispatch({type: RECEIVE_STOCKS}),

        // hard coding sample stocks while developing
        // fetchStocks: () => dispatch(fetchStocks()),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(FunctionalComponent);