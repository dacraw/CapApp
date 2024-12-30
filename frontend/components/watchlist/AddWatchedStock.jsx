import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createWatchedStock } from "../../actions/watchedStockActions";

export default (props) => {
  const [symbol, setSymbol] = useState("");
  const stocks = useSelector((state) => state.entities.stocks);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (stocks[symbol.toUpperCase()]) {
      dispatch(
        createWatchedStock({
          stock_id: stocks[symbol.toUpperCase()].id,
          watchlist_id: props.params.id,
        })
      );
    }

    // createWatchedStock(stockID)
  };
  return (
    <tr>
      <td colSpan="5">
        <form className="add-watched-stock" onSubmit={handleSubmit}>
          <label htmlFor="add-watched-stock-symbol">Stock Symbol:</label>
          {/* <input id="add-watched-stock-symbol" type="text" value={symbol} onChange={(e) => setSymbol(e.currentTarget.value)}/> */}
          <select
            defaultValue="Click here to select a stock"
            onChange={(e) => setSymbol(e.currentTarget.value)}
          >
            <option value="Click here to select a stock" disabled>
              Click here to select a stock
            </option>
            {Object.keys(stocks)
              .sort()
              .map((stockSymbol, i) => (
                <option key={i} value={stockSymbol}>
                  {stockSymbol}
                </option>
              ))}
          </select>
          <input type="submit" value="Add Stock to List" />
        </form>
      </td>
    </tr>
  );
};
