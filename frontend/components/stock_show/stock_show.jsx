import React, { Component, useEffect } from "react";
import GraphComponent from "../other/graph_component";
import AboutComponent from "./about_component";
import NewsComponent from "./news_component";
import { Link, useMatch } from "react-router-dom";
import Loading from "../other/loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchStock } from "../../actions/stock_actions";
import DashNavBar from "../nav/dash_nav_bar";
import { fetchPortfolios } from "../../actions/portfolio_actions";
import { fetchStocks } from "../../actions/stock_actions";
import StockShowSidebar from "./stock_show_sidebar";

const StockShow = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.id);
  const session = useSelector((state) => state.session);
  const match = useMatch("/stocks/:symbol");

  const cashAvailable = useSelector(
    (state) => state.entities.users[session.id].cashAvailable
  );
  const loading = useSelector((state) => state.loading);
  const symbol = match.params.symbol.toUpperCase();

  useEffect(() => {
    dispatch(fetchStocks());
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

  // this.props.fetchStock(sym.toUpperCase())
  if (!Object.keys(stocks).length) return null;
  // if (loading) return <Loading />
  if (!stock || !stock.about) return null;

  // add css class 'stock-negative' for negative change; default is green for positive

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
          <main className="stock-show-container">
            <GraphComponent stock={stock} />
            <AboutComponent about={stock.about} />
            <NewsComponent news={stock.news} />
          </main>
        </section>
        <div className="stock-sidebar-container">
          <aside>
            <StockShowSidebar />
          </aside>
        </div>
      </main>
    </>
  );
};
// class StockShow extends Component {
//     constructor(props) {
//         super(props);
//     }

//     componentDidMount() {
//         if (!this.props.stockSym.about){
//             this.props.fetchStock(this.props.match.params.symbol.toUpperCase());
//         }

//     }

//     componentDidUpdate(prevProps){

//         // check if the hash has changed; if so, fetch single stock info UNLESS already in the state
//         // currently only fetching 1d graph
//         const { fetchStock, stocks, match: { params: { symbol } } } = this.props;

//         const sym = symbol.toUpperCase();
//         if (sym !== prevProps.match.params.symbol.toUpperCase() && !!stocks[sym.toUpperCase()] && !stocks[sym].about){
//             fetchStock(sym);
//         }
//     }

//     render() {
//         // this.props.fetchStock(sym.toUpperCase())
//         const { stockSym, loading, stocks } = this.props;
//         if (!Object.keys(stocks).length) return null
//         // if (loading) return <Loading />
//         if (!stockSym || !stockSym.about) return null

//         // add css class 'stock-negative' for negative change; default is green for positive

//         return (
//             <main className="stock-show-container">

//                 <GraphComponent stock={stockSym} />
//                 <AboutComponent about={stockSym.about} />
//                 <NewsComponent news={stockSym.news} />

//             </main>

//         )
//     }
// }

export default StockShow;
