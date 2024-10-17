import React, { useEffect, useState } from "react";
import NewsComponent from "../other/NewsComponent";
import GraphComponent from "../other/graph_component";
import { useDispatch, useSelector } from "react-redux";
import DashNavBar from "../nav/dash_nav_bar";
import { fetchPortfolios } from "../../actions/portfolio_actions";
import DashMainSidebar from "./dash_main_sidebar";

const Dashboard = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.id);

  useEffect(() => {
    dispatch(fetchPortfolios(currentUser));
  }, []);

  const user = useSelector((state) => state.session.id);

  const portfolios = useSelector((state) => {
    return state.entities.portfolios;
  });

  const { portfolioGraph } = portfolios;
  if (!portfolios || !user || !portfolioGraph || !currentUser) return null;

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
                  ((portfolioGraph[portfolioGraph.length - 1].vw -
                    portfolioGraph[portfolioGraph.length - 2].vw) /
                    portfolioGraph[portfolioGraph.length - 2].vw) *
                  100
                ).toFixed(2),
                dollarChange: (
                  portfolioGraph[portfolioGraph.length - 1].vw -
                  portfolioGraph[portfolioGraph.length - 2].vw
                ).toFixed(2),
                price: portfolioGraph[portfolioGraph.length - 1].vw,
                chart: portfolioGraph,
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
