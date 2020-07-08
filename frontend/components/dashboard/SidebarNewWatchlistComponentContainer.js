import {connect} from 'react-redux'
import {createWatchlist} from '../../actions/watchlistActions'
import SidebarNewWatchlistComponent from './SidebarNewWatchlistComponent'

const mapStateToProps = state => {
    return ({
        
    })
}

const mapDispatchToProps = dispatch => {
    return ({
        createWatchlist: watchlist => dispatch(createWatchlist(watchlist)),
    })
}

export default connect(null, mapDispatchToProps)(SidebarNewWatchlistComponent)