import {connect} from 'react-redux'
import GraphComponent from './graph_component'
import {withRouter} from 'react-router-dom'

const mapStateToProps = ({ entities: { stocks } }) => {
    return ({
        stocks: stocks
    })
}

export default withRouter(connect(mapStateToProps)(GraphComponent))