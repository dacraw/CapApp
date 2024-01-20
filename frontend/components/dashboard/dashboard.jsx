import React, { Component, useEffect } from "react";
import { useLocation } from "react-router-dom";
import StockShowSidebarContainer from "../stock_show/stock_show_sidebar_container";
import DashMainSidebar from "../dashboard/dash_main_sidebar_container";
import StockShowContainer from "../stock_show/stock_show_container";
import Loading from "../other/loader";
import WatchlistShow from "../watchlist/watchlistShow";
import Loader from "../other/loader";
import { fetchStocks } from "../../actions/stock_actions";
import { useDispatch, useSelector } from "react-redux";
import DashNavBar from "../nav/dash_nav_bar";
import { fetchPortfolios } from "../../actions/portfolio_actions";
import DashboardContent from "./DashboardContent";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.id);
  const stockLoader = useSelector((state) => state.loading.stockLoader);

  useEffect(() => {
    dispatch(fetchPortfolios(currentUser));
    dispatch(fetchStocks());
  }, []);

  const stocks = useSelector((state) => state.entities.stocks);
  const portfolios = useSelector((state) => {
    return state.entities.portfolios;
  });

  if (!currentUser || !Object.keys(stocks).length) return null;

  return (
    <>
      <header>
        <DashNavBar
          currentUser={currentUser}
          cashAvailable={portfolios.cashAvailable}
          stocks={stocks}
          portfolios={portfolios}
        />
      </header>
      <main className="functional-component-container">
        <section className="main">
          {stockLoader ? <Loader /> : ""}
          <DashboardContent stockLoader={stockLoader} />
        </section>
        <div className="stock-sidebar-container">
          <aside>
            <DashMainSidebar stocks={stocks} portfolios={portfolios} />
          </aside>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
