import {connect} from 'react-redux'
import GraphComponent from './graph_component'
import {withRouter} from 'react-router-dom'

const mapStateToProps = ({ entities: { stocks } }, ownProps) => {
    return ({
        stock: stocks[ownProps.match.params.symbol.toUpperCase()],
    })
}

export default withRouter(connect(mapStateToProps)(GraphComponent))