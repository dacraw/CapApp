import React from "react";
import NewsComponent from "../other/NewsComponent";
import GraphComponent from "../other/graph_component";
import _ from "lodash";
import Loader from "../other/loader";
import { useSelector } from "react-redux";
import { constructPortfolioGraph } from "../util/dashboardUtil";

const DashboardContent = (props) => {
  const { stockLoader } = props;
  if (stockLoader) return <Loader />;

  const user = useSelector((state) => state.session.id);
  const stocks = useSelector((state) => state.entities.stocks);
  const portfolios = useSelector((state) => state.entities.portfolios);
  if (!portfolios || !user || !stocks) return null;

  const history = portfolios.history;

  return (
    <>
      <GraphComponent
        stock={
          history ? constructPortfolioGraph(history, portfolios, stocks) : {}
        }
      />
      <NewsComponent />
    </>
  );
};
export default DashboardContent;
