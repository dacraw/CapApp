import {connect} from 'react-redux'
import FunctionalComponent from './functional_component'
import {fetchPortfolio} from '../../util/portfolio_util'

const mapStateToProps = (state) => {
    return ({
        currentUser: state.session.id,

    })
}
const mapDispatchToProps = dispatch => {
    return ({

    })
}

export default connect(mapStateToProps, mapDispatchToProps)(FunctionalComponent);