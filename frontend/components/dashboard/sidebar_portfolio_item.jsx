import React from "react";
import { Link } from "react-router";
import DashMainSidebarGraph from "./DashMainSidebarGraph";
import { usdFormatter } from "../util/moneyUtil";

const SidebarPortfolioItem = ({ ownedStock }) => {
  const dollarChangeStyle = ownedStock.percentageChange <= 0 ? "negative" : "";
  const chart = ownedStock.chart;

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
              // symbol={ownedStock.symbol}
              percentageChange={ownedStock.percentageChange}
            />
          </div>
          <div className="stock-info">
            <div className="price">{usdFormatter.format(ownedStock.price)}</div>
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
