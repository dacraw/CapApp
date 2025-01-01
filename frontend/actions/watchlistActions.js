import * as WatchlistUtil from "../util/watchlistUtil";

export const RECEIVE_ALL_WATCHLISTS = "RECEIVE_ALL_WATCHLISTS";
export const RECEIVE_SINGLE_WATCHLIST = "RECEIVE_SINGLE_WATCHLIST";
export const REMOVE_SINGLE_WATCHLIST = "REMOVE_SINGLE_WATCHLIST";
export const RECEIVE_WATCHLIST_ERRORS = "RECEIVE_WATCHLIST_ERRORS";
export const START_LOADING_WATCHLIST = "START_LOADING_WATCHLIST";
export const CLEAR_WATCHLIST_ERRORS = "CLEAR_WATCHLIST_ERRORS";

const receiveAllWatchLists = (watchlists) => ({
  type: RECEIVE_ALL_WATCHLISTS,
  watchlists,
});

const receiveSingleWatchlist = (watchlist) => ({
  type: RECEIVE_SINGLE_WATCHLIST,
  watchlist,
});

const removeSingleWatchlist = (watchlistID) => ({
  type: REMOVE_SINGLE_WATCHLIST,
  watchlistID,
});

const receiveWatchlistErrors = (errors) => ({
  type: RECEIVE_WATCHLIST_ERRORS,
  errors,
});

const startLoadingWatchlist = () => ({
  type: START_LOADING_WATCHLIST,
});

export const fetchAllWatchlists = () => (dispatch) => {
  dispatch(startLoadingWatchlist());
  return WatchlistUtil.fetchAllWatchlists().then(
    (response) => dispatch(receiveAllWatchLists(response)),
    (errors) => dispatch(receiveWatchlistErrors(errors.json))
  );
};

// export const fetchSingleWatchlist = (watchlistID) => dispatch => {
//     return WatchlistUtil.fetchSingleWatchlist(watchlistID)
//         .then(
//             response => dispatch(receiveSingleWatchList(response)),
//             errors => dispatch(receiveWatchlistErrors(errors.json))
//         )
// }

export const createWatchlist = (watchlist) => (dispatch) => {
  dispatch(startLoadingWatchlist());
  return WatchlistUtil.createWatchlist(watchlist).then(
    (response) => {
      dispatch(receiveSingleWatchlist(response));
      // document.querySelector('#add-new-watchlist').style.display = "none";
    },
    (errors) => dispatch(receiveWatchlistErrors(errors.responseJSON))
  );
};

export const deleteWatchlist = (watchlistID) => (dispatch) => {
  dispatch(startLoadingWatchlist());
  return WatchlistUtil.deleteWatchlist(watchlistID).then(
    () => {
      dispatch(removeSingleWatchlist(watchlistID));
      // document.querySelector('#add-new-watchlist').style.display = "none";
    },
    (errors) => dispatch(receiveWatchlistErrors(errors.responseJSON))
  );
};
