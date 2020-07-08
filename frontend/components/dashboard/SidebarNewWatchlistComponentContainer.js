import {connect} from 'react-redux'
import {createWatchlist, CLEAR_WATCHLIST_ERRORS} from '../../actions/watchlistActions'
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
        clearWatchlistErrors: () => dispatch({type: CLEAR_WATCHLIST_ERRORS})
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarNewWatchlistComponent)