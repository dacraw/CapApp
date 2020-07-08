import {connect} from 'react-redux'
import {createWatchlist} from '../../actions/watchlistActions'
import SidebarNewWatchlistComponent from './SidebarNewWatchlistComponent'

const mapStateToProps = state => {
    return ({
        errors: state.errors.watchlists,
        watchlistLoading: state.loading,
        watchlists: state.entities.watchlists,
    })
}

const mapDispatchToProps = dispatch => {
    return ({
        createWatchlist: watchlist => dispatch(createWatchlist(watchlist)),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarNewWatchlistComponent)