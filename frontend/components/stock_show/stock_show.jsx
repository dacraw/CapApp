import React, { useEffect } from "react";
import GraphComponent from "../other/graph_component";
import AboutComponent from "./about_component";
import NewsComponent from "./news_component";
import { useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStock } from "../../actions/stock_actions";
import DashNavBar from "../nav/dash_nav_bar";
import { fetchPortfolios } from "../../actions/portfolio_actions";
import StockShowSidebar from "./stock_show_sidebar";

const StockShow = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.id);
  const session = useSelector((state) => state.session);
  const match = useMatch("/stocks/:symbol");

  const cashAvailable = useSelector(
    (state) => state.entities.users[session.id].cashAvailable
  );
  const symbol = match.params.symbol.toUpperCase();

  useEffect(() => {
    dispatch(fetchStock(symbol));
    dispatch(fetchPortfolios(currentUser));
  }, [dispatch]);

  const stocks = useSelector((state) => state.entities.stocks);
  const stock = stocks[symbol];

  const portfolios = useSelector((state) => {
    return state.entities.portfolios;
  });

  useEffect(() => {
    if (!!stock && !stock.about) {
      dispatch(fetchStock(symbol));
    }
  }, [symbol]);

  if (!Object.keys(stocks).length) return null;
  if (!stock || !stock.about) return null;

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
            <GraphComponent stock={stock} />
            <aside className="stock-sidebar-container">
              <StockShowSidebar />
            </aside>
          </div>

          <main className="stock-show-container">
            <AboutComponent about={stock.about} />
            <NewsComponent news={stock.news} />
          </main>
        </section>
      </main>
    </>
  );
};

export default StockShow;
