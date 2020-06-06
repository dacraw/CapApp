import {connect} from 'react-redux'
import FunctionalComponent from './functional_component'
import {fetchStocks} from '../../actions/stock_actions'


const mapStateToProps = (state) => {
    return ({
        currentUser: state.session.id,
    })
}

const mapDispatchToProps = dispatch => {
    return ({
        fetchStocks: () => dispatch(fetchStocks()),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(FunctionalComponent);