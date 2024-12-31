import React from "react";
import { Link, useLocation, useParams } from "react-router";
import { enterSearchList, filterResults } from "../util/dashNavBarUtil";
import { useEffect, useState } from "react";

export default function StockSearch({ stocks }) {
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation();
  const params = useParams();
  useEffect(() => {
    setSearchValue("");
    $("#stock-list ul:first-child").fadeOut(100);
  }, [location.pathname]);

  return (
    <div className="search-wrapper">
      <input
        id="stock-search"
        onChange={(e) => {
          filterResults(e, setSearchValue, params);
        }}
        onKeyUp={enterSearchList}
        value={searchValue}
        className="search"
        placeholder="Enter stock symbol"
        type="text"
        autoComplete="off"
        name="stock-search"
      />

      <section className="stock-list" id="stock-list">
        <ul>
          <li className="category">Stocks</li>
          {Object.values(stocks).map((stock, idx) => (
            <li key={idx}>
              <Link
                to={`/stocks/${stock.symbol ? stock.symbol.toLowerCase() : ""}`}
              >
                <span className="symbol">{stock.symbol}</span>
                <span className="company">{stock.company}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <i className="fas fa-search"></i>
    </div>
  );
}
