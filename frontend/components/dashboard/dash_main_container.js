import {connect} from 'react-redux'
import DashMain from './dash_main'
import {fetchPortfolio} from '../../util/portfolio_util'

const mapStateToProps = (state) => {
    return ({
        cashAvailable: state.entities.users[state.session.id].cashAvailable
    })
}
const mapDispatchToProps = dispatch => {
    return ({
        fetchPortfolio: userId => dispatch(fetchPortfolio(userId)),
    })
}