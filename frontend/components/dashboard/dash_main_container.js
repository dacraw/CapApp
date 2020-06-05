import {connect} from 'react-redux'
import DashMain from './dash_main'
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

export default connect(mapStateToProps, mapDispatchToProps)(DashMain);