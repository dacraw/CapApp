import React, { useEffect, useState } from "react";
import NewsComponent from "../other/NewsComponent";
import GraphComponent from "../other/graph_component";
import { useDispatch, useSelector } from "react-redux";
import DashNavBar from "../nav/dash_nav_bar";
import { fetchPortfolios } from "../../actions/portfolio_actions";
import { portfolioValue } from "../../util/portfolio_util";
import DashMainSidebar from "./dash_main_sidebar";

const Dashboard = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.id);
  const [portfolioValues, setPortfolioValues] = useState([]);

  useEffect(() => {
    dispatch(fetchPortfolios(currentUser));
  }, []);

  useEffect(() => {
    portfolioValue(currentUser).then((data) => setPortfolioValues(data));
  }, []);

  const user = useSelector((state) => state.session.id);

  const portfolios = useSelector((state) => {
    return state.entities.portfolios;
  });

  if (portfolioValues.length === 0) return null;
  if (!portfolios || !user) return null;
  if (!currentUser) return null;

  return (
    <>
      <header>
        <DashNavBar
          currentUser={currentUser}
          cashAvailable={portfolios.cashAvailable}
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
              <DashMainSidebar />
            </aside>
          </div>

          <NewsComponent />
        </section>
      </main>
    </>
  );
};

export default Dashboard;
