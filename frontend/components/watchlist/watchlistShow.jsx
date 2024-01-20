import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import WatchlistStock from "./WatchlistStock";
import AddWatchedStock from "./AddWatchedStock";
import { redirect, useParams } from "react-router-dom";
import { fetchAllWatchlists } from "../../actions/watchlistActions";
import DashNavBar from "../nav/dash_nav_bar";

export default (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllWatchlists());
  });
  const params = useParams();
  const watchlists = useSelector((state) => state.entities.watchlists);
  if (!Object.values(watchlists).length) return null;

  if (!(params.id in watchlists)) return redirect("/dashboard");
  const watchlistID = params.id;
  const watchlist = watchlists[watchlistID];
  let watchedStocks;

  if (watchlistID in watchlists && !!watchlist.watchedStocks) {
    watchedStocks = watchlist.watchedStocks;
  } else {
    watchedStocks = {};
  }
  return (
    <>
      <header>
        <DashNavBar />
      </header>
      <h1 className="watchlist-show-title">{watchlists[params.id].title}</h1>
      <h5 className="watchlist-show-num-items">
        {Object.keys(watchedStocks).length} items
      </h5>
      <table className="watchlist-show">
        <tbody>
          <AddWatchedStock params={params} />
          <tr>
            <th>Symbol</th>
            <th>Company</th>
            <th>Current Price</th>
            <th>Daily % Change</th>
            <th></th>
          </tr>
          {Object.keys(watchedStocks).length
            ? Object.values(watchedStocks).map((stock) => (
                <WatchlistStock key={stock.symbol} watchedStock={stock} />
              ))
            : ""}
        </tbody>
      </table>
    </>
  );
};
