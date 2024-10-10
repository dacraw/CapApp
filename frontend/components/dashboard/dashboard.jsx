import React, { useEffect, useState } from "react";
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
import { portfolioValue } from "../../util/portfolio_util";

const Dashboard = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.id);
  const stockLoader = useSelector((state) => state.loading.stockLoader);
  const [portfolioValues, setPortfolioValues] = useState([]);

  useEffect(() => {
    dispatch(fetchPortfolios(currentUser));
    dispatch(fetchStocks());
  }, []);

  useEffect(() => {
    portfolioValue(currentUser).then((data) => setPortfolioValues(data));
  }, []);

  const user = useSelector((state) => state.session.id);

  const stocks = useSelector((state) => state.entities.stocks);
  const portfolios = useSelector((state) => {
    return state.entities.portfolios;
  });
  const history = portfolios.history;

  if (portfolioValues.length === 0) return null;
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
              stock={{
                percentageChange: (
                  ((portfolioValues[portfolioValues.length - 1].vw -
                    portfolioValues[portfolioValues.length - 2].vw) /
                    portfolioValues[portfolioValues.length - 2].vw) *
                  100
                ).toFixed(2),
                dollarChange: (
                  portfolioValues[portfolioValues.length - 1].vw -
                  portfolioValues[portfolioValues.length - 2].vw
                ).toFixed(2),
                price: portfolioValues[portfolioValues.length - 1].vw,
                chart: portfolioValues,
              }}
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
