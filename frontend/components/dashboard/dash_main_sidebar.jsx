import React from "react";
import SidebarPortfolioItem from "./sidebar_portfolio_item";
import SidebarWatchlists from "./SidebarWatchlists";
import SideBarNewWatchlistComponent from "./SidebarNewWatchlistComponentContainer";
import { useSelector } from "react-redux";

const DashMainSidebar = () => {
  const newWatchlist = () => {
    document.querySelector("#add-new-watchlist").style.display = "flex";
  };

  const portfolios = useSelector((state) => state.entities.portfolios);
  const watchlists = useSelector((state) => state.entities.watchlists);

  if (!portfolios) return null;

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
              <SidebarPortfolioItem key={i} ownedStock={stock} />
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
