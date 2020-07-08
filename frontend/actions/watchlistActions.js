import * as WatchlistUtil from '../util/watchlistUtil'

export const RECEIVE_ALL_WATCHLISTS = "RECEIVE_ALL_WATCHLISTS";
export const RECEIVE_SINGLE_WATCHLIST = "RECEIVE_SINGLE_WATCHLIST";
export const RECEIVE_WATCHLIST_ERRORS = "RECEIVE_WATCHLIST_ERRORS";

const receiveAllWatchLists = watchlists => ({
    type: RECEIVE_ALL_WATCHLISTS,
    watchlists,
});

const receiveSingleWatchlist = watchlist => ({
    type: RECEIVE_SINGLE_WATCHLIST,
    watchlist,
});

const receiveWatchlistErrors = errors => ({
    type: RECEIVE_WATCHLIST_ERRORS,
    errors
});

export const fetchAllWatchlists = () => dispatch => {
    return WatchlistUtil.fetchAllWatchlists()
        .then(
            response => dispatch(receiveAllWatchLists(response)),
            errors => dispatch(receiveWatchlistErrors(errors.json))
        )
}

// export const fetchSingleWatchlist = (watchlistID) => dispatch => {
//     return WatchlistUtil.fetchSingleWatchlist(watchlistID)
//         .then(
//             response => dispatch(receiveSingleWatchList(response)),
//             errors => dispatch(receiveWatchlistErrors(errors.json))
//         )
// }

export const createWatchlist = watchlist => dispatch => {
    return WatchlistUtil.createWatchlist(watchlist)
        .then(
            response => dispatch(receiveSingleWatchlist(response)),
            errors => dispatch(receiveWatchlistErrors(errors.responseJSON))
        )    
}


