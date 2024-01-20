import React, { Component, useEffect, useState } from "react";
import LoaderTwo from "../other/loader2";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  createPortfolio,
  fetchPortfolios,
  updatePortfolio,
} from "../../actions/portfolio_actions";
import { fetchStocks } from "../../actions/stock_actions";

const StockShowSidebar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.id);
  const userInfo = useSelector((state) => state.entities.users[currentUser]);
  const params = useParams();
  const [symbol, setSymbol] = useState(params.symbol.toUpperCase());
  const [userId, setUserId] = useState(currentUser);
  const [stockPrice, setStockPrice] = useState("");
  const [formType, setFormType] = useState("buy");
  const [investType, setInvestType] = useState("Shares");
  const errors = useSelector((state) => state.errors);
  const portfolioLoader = useSelector((state) => state.loading.portfolioLoader);
  useEffect(() => {
    dispatch(fetchStocks());
    dispatch(fetchPortfolios(currentUser));
  }, [dispatch]);
  const portfolios = useSelector((state) => state.entities.portfolios);
  const stocks = useSelector((state) => state.entities.stocks);
  const stock = stocks[params.symbol.toUpperCase()];
  const [numShares, setNumShares] = useState("");

  useEffect(() => {
    return () => dispatch({ type: "CLEAR_MESSAGES" });
  }, [dispatch]);

  useEffect(() => {
    if (!!stocks[params.symbol.toUpperCase()]) {
      setSymbol(params.symbol.toUpperCase());
      setNumShares("");
      setStockPrice("");
      setFormType("buy");

      userInfo.newShares = "";
    }
  }, [stocks, params.symbol.toUpperCase()]);

  const showInvestTypes = (e) => {
    e.preventDefault();

    e.currentTarget.nextSibling.style.display = "block";
  };

  const handleInvestType = (e) => {
    e.preventDefault();

    e.currentTarget.parentNode.style.display = "none";
    $(".invest-type ul li.selected").removeClass("selected");
    e.currentTarget.classList.add("selected");
    setInvestType(e.currentTarget.textContent);
    setNumShares("");
  };

  const handleSubmit = (e) => {
    // debugger;
    e.preventDefault();

    $(".success").stop(true, true).show().fadeOut(7000);
    $(".errors").stop(true, true).show().fadeOut(7000);

    dispatch(
      createPortfolio({
        num_shares: numShares,
        symbol,
        user_id: userId,
        stock_price: stockPrice,
        formType,
        // investType,
      })
    );
  };

  const setFormTypeHelper = (type) => {
    // set formType when user clicks buy or sell in the sidebar
    // also hide or show cash available or num shares accordingly
    return (e) => {
      e.stopPropagation();

      setNumShares("");

      $(".buy-sell .selected").removeClass("selected");

      // add selected to current
      e.currentTarget.classList.add("selected");

      // if shares are less than 0, add the color class
      stock.dollarChange <= 0
        ? e.currentTarget.classList.add("negative-change")
        : e.currentTarget.classList.add("positive-change");

      setFormType(type);
      if (type === "sell") {
        $(".buying-power").removeClass("show").addClass("hide");
        $(".num-shares").removeClass("hide").addClass("show");
      } else if (type === "buy") {
        $(".num-shares").removeClass("show").addClass("hide");
        $(".buying-power").removeClass("hide").addClass("show");
      }
    };
  };

  const showBox = (e) => {
    e.stopPropagation();

    // e.currentTarget.nextSibling.classList.toggle('show');
    $(e.currentTarget).next().fadeToggle(200);
  };

  const renderInvestType = (investType) => {
    let estimatedPrice =
      numShares == 0
        ? stock.price
        : Math.round((stock.price * numShares + Number.EPSILON) * 100) / 100;
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });

    switch (investType) {
      case "Shares":
        return (
          <>
            <section className="line">
              <label>Shares</label>
              <input
                onChange={(e) => {
                  setNumShares(e.currentTarget.value);
                  setStockPrice(stock.price);
                }}
                value={numShares}
                type="number"
                placeholder="0"
                min=".01"
                max={formType === "sell" ? ownedShares : ""}
                step=".01"
                required
              />
            </section>
            <section className="line">
              <label>Market Price</label>
              <data className="cost-credit">
                {formatter.format(stock.price)}
              </data>
            </section>
            <hr />
            <section className="line cost-credit">
              <label>
                {formType === "buy" ? "Estimated Cost" : "Estimated Credit"}
              </label>
              <data>{formatter.format(estimatedPrice)} </data>
            </section>
          </>
        );
      default:
        break;
    }
  };
  // this requires stock.chart for pricing, so return null if it isnt established yet
  if (!stock || !stock.chart || !userInfo || !stock.price) return null;

  const changeType = stock.dollarChange <= 0 ? "negative-change" : "";

  // this is causing infinite loop
  // if (!!portfolios.stocks && !!portfolios.stocks[params.symbol.toUpperCase()]) {
  //   setNumShares(portfolios.stocks[params.symbol.toUpperCase()]["sum"]);
  // }

  const ownedShares =
    portfolios.stocks && portfolios.stocks[stock.symbol]
      ? portfolios.stocks[stock.symbol].sum
      : 0;

  // remove selling stock as an option when count reaches 0
  if (ownedShares == 0 && formType === "sell") {
    $("#buy").addClass("selected");
    setFormType("buy");
    setNumShares("");
    $(".num-shares").removeClass("show").addClass("hide");
    $(".buying-power").removeClass("hide").addClass("show");
  }

  const sellClass = () => {
    const change =
      stock.dollarChange <= 0 ? "negative-change" : "positive-change";
    const reveal = ownedShares > 0 ? "show" : "hide";
    return `${change} ${reveal}`;
  };

  const dollarChange =
    stock.dollarChange <= 0 ? "negative-change" : "positive-change";

  return (
    <>
      <div className="stock-show-sidebar">
        <ul className="buy-sell">
          <li
            onClick={setFormTypeHelper("buy")}
            id="buy"
            className={`selected ${dollarChange}`}
          >
            Buy {stock.symbol}
          </li>
          <li onClick={setFormTypeHelper("sell")} className={sellClass()}>
            Sell {stock.symbol}
          </li>
        </ul>
        <hr />
        <section onSubmit={handleSubmit}>
          <form className="pst-form">
            <section className="line">
              <label>Invest In</label>
              <ul className="invest-type">
                <li onClick={showInvestTypes}>{investType}</li>
                <ul>
                  <li
                    onClick={handleInvestType}
                    className={`selected ${changeType}`}
                  >
                    Shares
                  </li>
                </ul>
              </ul>
            </section>

            {renderInvestType(investType)}

            <section className="success">{userInfo.newShares}</section>
            <section className="errors">{errors[0]}</section>
            {portfolioLoader ? (
              <LoaderTwo />
            ) : (
              <button className={dollarChange}>
                {formType[0].toUpperCase() + formType.slice(1)} {symbol}
              </button>
            )}
          </form>
        </section>
        <hr />
        <section className={`buying-power bottom show ${dollarChange}`}>
          <a onClick={showBox}>
            {portfolios.cashAvailable} available for trading.{" "}
          </a>
          <div className="info-box" id="sidebar-info-dropdown">
            <h3>Good luck!</h3>
            <div className="line">
              <p>Vestibulum convallis ut nulla non tincidunt. </p>
              <p>Praesent congue sed neque in sagittis. </p>
            </div>
            <div className="line">
              <p>Praesent in efficitur massa, at feugiat lectus. </p>
              <p>Proin imperdiet, felis nec tristique tempor </p>
            </div>
          </div>
          <i className="fas fa-question-circle"></i>
        </section>
        <section className="num-shares bottom hide">
          {ownedShares.toFixed(2)} shares available for trading.
        </section>
      </div>
    </>
  );
};
// class StockShowSidebar extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             num_shares: "",
//             symbol: "",
//             user_id: 0,
//             stock_price: "",
//             formType: 'buy',
//             investType: 'Shares',
//         }
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.handleInvestType = this.handleInvestType.bind(this);
//     }

//     componentDidMount() {
//         // this.props.fetchStocks()

//         // set user_id to currentuser for form submission
//         this.setState({user_id: this.props.currentUser, symbol: this.props.match.params.symbol.toUpperCase()})
//     }

//     componentWillUnmount(){
//         this.props.clearMessages();
//     }

//     componentDidUpdate(prevProps) {
//         // if user changes hash locations, update the symbol
//         // 2nd part of conditional only updates the state's symbol to the given symbol if it's present in the stock list

//         if (this.props.match.params.symbol.toUpperCase() !== prevProps.match.params.symbol.toUpperCase() && !!this.props.stocks[this.props.match.params.symbol.toUpperCase()]){

//             this.setState({
//                 symbol: this.props.match.params.symbol.toUpperCase(),
//                 num_shares: "",
//                 stock_price: "",
//                 formType: 'buy',
//             });
//             // this clears the success message when changing to another stock
//             this.props.userInfo.newShares = "";
//             this.handleInvestType = this.handleInvestType.bind(this)
//         }
//     }

//     showInvestTypes(e){
//         e.preventDefault();

//         e.currentTarget.nextSibling.style.display = "block";
//     }

//     handleInvestType(e){
//         e.preventDefault();

//         e.currentTarget.parentNode.style.display = "none";
//         $('.invest-type ul li.selected').removeClass('selected');
//         e.currentTarget.classList.add('selected');
//         this.setState({
//             investType: e.currentTarget.textContent,
//             num_shares: "",
//         })
//     }

//     handleInput(field){
//         return e => (
//             this.setState({
//                 [field]: e.currentTarget.value,
//                 stock_price: this.props.stock.price,
//             })
//         )
//     }

//     handleSubmit(e){
//         e.preventDefault();

//         $('.success').stop(true, true).show().fadeOut(7000);
//         $('.errors').stop(true, true).show().fadeOut(7000);

//         this.props.createPortfolio(this.state);

//     }

//     setFormType(type){
//         // set formType when user clicks buy or sell in the sidebar
//         // also hide or show cash available or num shares accordingly
//         return e => {

//             e.stopPropagation();

//             this.setState({num_shares: ""});

//             $('.buy-sell .selected').removeClass('selected');

//             // add selected to current
//             e.currentTarget.classList.add('selected');

//             // if shares are less than 0, add the color class
//             (this.props.stock.dollarChange <= 0) ? e.currentTarget.classList.add('negative-change') : e.currentTarget.classList.add('positive-change');

//             this.setState({formType: type});
//             if (type === 'sell') {
//                 $('.buying-power').removeClass('show').addClass('hide');
//                 $('.num-shares').removeClass('hide').addClass('show')
//             } else if (type === 'buy') {
//                 $('.num-shares').removeClass('show').addClass('hide');
//                 $('.buying-power').removeClass('hide').addClass('show')
//             }
//         }
//     }

//     showBox(e){
//         e.stopPropagation();

//         // e.currentTarget.nextSibling.classList.toggle('show');
//         $(e.currentTarget).next().fadeToggle(200);
//     }

//     render() {
//         const { userInfo, stock, errors, portfolios, portfolioLoader } = this.props;

//         const renderInvestType = (investType) => {
//             const { stock } = this.props;

//             let estimatedPrice = (this.state.num_shares == 0) ? stock.price : Math.round((stock.price * this.state.num_shares + Number.EPSILON) * 100) / 100;
//             const formatter = new Intl.NumberFormat('en-US', {
//                 style: 'currency',
//                 currency: 'USD',
//                 minimumFractionDigits: 2
//             });

//             switch (investType) {
//                 case 'Shares':
//                     return (
//                         <>
//                         <section className="line">
//                             <label>Shares</label>
//                             <input onChange={this.handleInput('num_shares')} value={this.state.num_shares} type="number" placeholder="0" min='.01' max={(this.state.formType === 'sell') ? numShares : ""} step=".01" required />
//                         </section>
//                         <section className="line">
//                             <label>Market Price</label>
//                             <data className="cost-credit">{formatter.format(stock.price)}</data>
//                         </section>
//                         <hr />
//                         <section className="line cost-credit">
//                             <label>{(this.state.formType === 'buy') ? 'Estimated Cost' : 'Estimated Credit'}</label>
//                             <data>{formatter.format(estimatedPrice)} </data>
//                         </section>
//                       </>
//                     )
//                 default:
//                     break;
//             }
//         }
//         // this requires stock.chart for pricing, so return null if it isnt established yet
//         if (!stock || !stock.chart || !userInfo || !stock.price) return null;

//         const changeType = (stock.dollarChange <= 0) ? "negative-change" : "";

//         // NUMSHARES check if user owns shares before displaying num_shares
//         let numShares = 0;

//         if (!!portfolios.stocks && !!portfolios.stocks[this.props.match.params.symbol.toUpperCase()]){
//             numShares = portfolios.stocks[this.props.match.params.symbol.toUpperCase()]['sum']

//         }

//         // remove selling stock as an option when count reaches 0
//         if (numShares == 0 && this.state.formType === 'sell'){
//             $('#buy').addClass('selected');
//             this.setState({formType:'buy', num_shares: ""});
//             $('.num-shares').removeClass('show').addClass('hide');
//             $('.buying-power').removeClass('hide').addClass('show');
//         }

//         const sellClass = () => {
//             const change = (stock.dollarChange <= 0) ? "negative-change" : "positive-change";
//             const reveal = (numShares > 0) ? "show" : "hide";
//             return `${change} ${reveal}`;
//         }

//         const dollarChange = (stock.dollarChange <= 0) ? "negative-change" : "positive-change";

//         return (
//             <>
//                 <div className="stock-show-sidebar">
//                     <ul className="buy-sell">
//                         <li onClick={this.setFormType('buy')} id="buy" className={`selected ${dollarChange}`}>Buy {stock.symbol}</li>
//                         <li onClick={this.setFormType('sell')} className={sellClass()}>Sell {stock.symbol}</li>
//                     </ul>
//                     <hr />
//                     <section onSubmit={this.handleSubmit}>
//                         <form className="pst-form">
//                             <section className="line">
//                                 {/* <i class="fas fa-arrows-alt-v"></i> */}
//                                 <label>Invest In</label>
//                                 <ul className="invest-type">
//                                     <li onClick={this.showInvestTypes}>{this.state.investType}</li>
//                                     <ul>
//                                         {/* <li onClick={this.handleInvestType} className={changeType}>Dollars</li> */}
//                                         <li onClick={this.handleInvestType} className={`selected ${changeType}`}>Shares</li>
//                                     </ul>
//                                 </ul>
//                             </section>

//                             {renderInvestType(this.state.investType)}

//                             <section className="success">
//                                 {this.props.userInfo.newShares}
//                             </section>
//                             <section className="errors">
//                                 {errors[0]}
//                             </section>
//                             {(portfolioLoader) ? <LoaderTwo /> : <button className={dollarChange}>{this.state.formType[0].toUpperCase() + this.state.formType.slice(1)} {this.state.symbol}</button>}
//                         </form>
//                     </section>
//                     <hr />
//                     <section className={`buying-power bottom show ${dollarChange}`}>
//                             <a onClick={this.showBox}>{portfolios.cashAvailable} available for trading. </a>
//                             <div className="info-box" id="sidebar-info-dropdown">
//                                 <h3>Good luck!</h3>
//                                 <div className="line">
//                                     <p>Vestibulum convallis ut nulla non tincidunt.  </p>
//                                     <p>Praesent congue sed neque in sagittis.  </p>
//                                 </div>
//                                 <div className="line">
//                                     <p>Praesent in efficitur massa, at feugiat lectus.  </p>
//                                     <p>Proin imperdiet, felis nec tristique tempor </p>
//                                 </div>
//                             </div>
//                             <i className="fas fa-question-circle"></i>
//                     </section>
//                     <section className="num-shares bottom hide">
//                         {numShares} shares available for trading.
//                     </section>
//                 </div>
//             </>
//         )
//     }
// }

export default StockShowSidebar;
