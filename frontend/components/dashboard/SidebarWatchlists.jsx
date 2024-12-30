import React, { Component, useEffect } from "react";
import SideBarNewWatchlistComponent from "./SidebarNewWatchlistComponentContainer";
import SidebarWatchlist from "./SidebarWatchlist";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllWatchlists } from "../../actions/watchlistActions";
import { Route } from "react-router";

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllWatchlists());
  }, []);

  const watchlists = useSelector((state) => state.entities.watchlists);
  const noWatchlists = (
    <h5 className="no-watchlists-message">
      You currently have no watchlists. Click on the "+" above to add
      watchlists.
    </h5>
  );
  return (
    <div>
      {Object.values(watchlists).length > 0
        ? Object.values(watchlists).map((watchlist, idx) => (
            <SidebarWatchlist key={idx} watchlist={watchlist} />
          ))
        : noWatchlists}
    </div>
  );
};
