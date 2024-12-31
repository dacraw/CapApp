import React, { useEffect, useState } from "react";
import LoaderTwo from "../other/loader2";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createPortfolio } from "../../actions/portfolio_actions";
import { usdFormatter } from "../util/moneyUtil";

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
    // dispatch(fetchStocks());
    // dispatch(fetchPortfolios(currentUser));
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
                min="1"
                max={formType === "sell" ? ownedShares : ""}
                step="1"
                required
              />
            </section>
            <section className="line">
              <label>Market Price</label>
              <data className="cost-credit">
                {usdFormatter.format(stock.price)}
              </data>
            </section>
            <hr />
            <section className="line cost-credit">
              <label>
                {formType === "buy" ? "Estimated Cost" : "Estimated Credit"}
              </label>
              <data>{usdFormatter.format(estimatedPrice)} </data>
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

export default StockShowSidebar;
