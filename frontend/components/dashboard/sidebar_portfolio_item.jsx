import React from "react";
import { Link } from "react-router-dom";
import DashMainSidebarGraph from "./DashMainSidebarGraph";
import { useSelector } from "react-redux";

const SidebarPortfolioItem = ({ ownedStock }) => {
  const dollarChangeStyle = ownedStock.percentageChange <= 0 ? "negative" : "";
  const chart = ownedStock.chart;
  const formatMoney = (number, decPlaces, decSep, thouSep) => {
    (decPlaces = isNaN((decPlaces = Math.abs(decPlaces))) ? 2 : decPlaces),
      (decSep = typeof decSep === "undefined" ? "." : decSep);
    thouSep = typeof thouSep === "undefined" ? "," : thouSep;
    var sign = number < 0 ? "-" : "";
    var i = String(
      parseInt((number = Math.abs(Number(number) || 0).toFixed(decPlaces)))
    );
    var j = (j = i.length) > 3 ? j % 3 : 0;

    return (
      sign +
      (j ? i.substr(0, j) + thouSep : "") +
      i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
      (decPlaces
        ? decSep +
          Math.abs(number - i)
            .toFixed(decPlaces)
            .slice(2)
        : "")
    );
  };

  return (
    <>
      <li className="owned-stocks">
        <Link className="stock-link" to={`/stocks/${ownedStock.symbol}`}>
          <div className="symbol-numshares">
            <div className="symbol">{ownedStock.symbol}</div>
            <div className="num-shares">{ownedStock.sum} shares</div>
          </div>
          <div className="stock-mini-graph">
            <DashMainSidebarGraph
              data={chart}
              symbol={ownedStock.symbol}
              percentageChange={ownedStock.percentageChange}
            />
          </div>
          <div className="stock-info">
            <div className="price">
              ${formatMoney(ownedStock.price, 2, ".", ",")}
            </div>
            <div className={`percentage-change ${dollarChangeStyle}`}>
              {ownedStock.percentageChange}%
            </div>
          </div>
        </Link>
      </li>
    </>
  );
};

export default SidebarPortfolioItem;
