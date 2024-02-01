import React, { useEffect } from "react";
import DashMainSidebar from "../dashboard/dash_main_sidebar_container";
import Loader from "../other/loader";
import NewsComponent from "../other/NewsComponent";
import GraphComponent from "../other/graph_component";
import { fetchStocks } from "../../actions/stock_actions";
import { useDispatch, useSelector } from "react-redux";
import DashNavBar from "../nav/dash_nav_bar";
import { fetchPortfolios } from "../../actions/portfolio_actions";
import DashboardContent from "./DashboardContent";
import { constructPortfolioGraph } from "../util/dashboardUtil";

const Dashboard = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.id);
  const stockLoader = useSelector((state) => state.loading.stockLoader);

  useEffect(() => {
    dispatch(fetchPortfolios(currentUser));
    dispatch(fetchStocks());
  }, []);

  const user = useSelector((state) => state.session.id);

  const stocks = useSelector((state) => state.entities.stocks);
  const portfolios = useSelector((state) => {
    return state.entities.portfolios;
  });
  const history = portfolios.history;

  if (!portfolios || !user || !stocks) return null;
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
          <div className="functional-component-container-top">
            <GraphComponent
              stock={
                history
                  ? constructPortfolioGraph(history, portfolios, stocks)
                  : {}
              }
            />
            <aside className="stock-sidebar-container">
              <DashMainSidebar stocks={stocks} portfolios={portfolios} />
            </aside>
          </div>

          <NewsComponent />
        </section>
      </main>
    </>
  );
};

export default Dashboard;
