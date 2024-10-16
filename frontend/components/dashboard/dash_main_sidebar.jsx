import React, { Component, useEffect } from "react";
import SidebarPortfolioItem from "./sidebar_portfolio_item";
import SidebarWatchlists from "./SidebarWatchlists";
import SideBarNewWatchlistComponent from "./SidebarNewWatchlistComponentContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchStocks } from "../../actions/stock_actions";

const DashMainSidebar = (props) => {
  const dispatch = useDispatch();

  const newWatchlist = () => {
    document.querySelector("#add-new-watchlist").style.display = "flex";
  };

  const stocks = useSelector((state) => state.entities.stocks);
  const portfolios = useSelector((state) => state.entities.portfolios);
  const watchlists = useSelector((state) => state.entities.watchlists);

  console.log("dougie", portfolios);
  if (!portfolios) return null;

  useEffect(() => {
    if (!Object.keys(stocks).length) {
      dispatch(fetchStocks());
    }
  }, []);
  const portfolioStocks = portfolios.stocks || [];

  const noStocks = (
    <div className="sidebar-no-stocks">
      <h5>You currently have no stocks. Search a stock symbol to buy!</h5>
    </div>
  );

  return (
    <div className="stock-show-sidebar">
      <div className="sidebar-header">
        <h1 className="stocks-title title">Stocks</h1>
      </div>
      <div>
        {Object.values(portfolioStocks).length > 0
          ? Object.values(portfolioStocks).map((stock, i) => (
              <SidebarPortfolioItem
                key={i}
                ownedStock={stock}
                stocks={stocks}
              />
            ))
          : noStocks}
      </div>
      <div className="sidebar-header">
        <h1 className="title">Watchlists:</h1>
        <i onClick={newWatchlist} className="far fa-plus-square"></i>
      </div>
      <SideBarNewWatchlistComponent watchlists={watchlists} />
      <SidebarWatchlists />
    </div>
  );
};

export default DashMainSidebar;
