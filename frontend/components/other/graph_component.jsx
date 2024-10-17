import React, { Component, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useMatch, useParams } from "react-router";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const GraphComponent = (props) => {
  const [price, setPrice] = useState(props.stock.price);
  const [dollarChange, setDollarChange] = useState(props.stock.dollarChange);
  const [percentageChange, setPercentageChange] = useState(
    props.stock.percentageChange
  );

  useEffect(() => {
    setPrice(props.stock.price);
    setDollarChange(props.stock.dollarChange);
    setPercentageChange(props.stock.percentageChange);
  }, [
    props.stock.price,
    props.stock.dollarChange,
    props.stock.percentageChange,
  ]);

  const handleEnter = (e) => {
    if (!e.activePayload || !e.activePayload[0].value) return null;
    setPrice(parseFloat(e.activePayload[0].value));
    setDollarChange(
      (e.activePayload[0].value - props.stock.chart[0].vw).toFixed(2)
    );
    setPercentageChange(
      ((e.activePayload[0].value / props.stock.chart[0].vw - 1) * 100).toFixed(
        2
      )
    );
  };

  const handleLeave = (value) => {
    setPrice(value);
    setDollarChange(props.stock.dollarChange);
    setPercentageChange(props.stock.percentageChange);
  };

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

  const { stock } = props;

  if (!stock || !stock.chart) return null;

  const data = stock.chart;

  function CustomTooltip({ label, active }) {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}`}</p>
        </div>
      );
    }

    return null;
  }

  const strokeColor = stock.dollarChange >= 0 ? "rgb(16, 197, 40)" : "#ff4f0b";
  const dollarChangeDirection =
    stock.dollarChange >= 0 ? "" : "negative-change";
  return (
    <section className="stock-graph">
      <h2 className="company-name">{stock.company ? stock.company : ""}</h2>
      <h2 className="current-price">${formatMoney(price, 2, ".", ",")}</h2>
      <h2 className="percentage-change">
        <span className="dollar">
          ${formatMoney(dollarChange, 2, ".", ",")}
        </span>
        <span className="percentage">
          ({percentageChange === "NaN" ? 0.0 : percentageChange}%)
        </span>
        <span className="timeframe">Today</span>
      </h2>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          className="stock-graph"
          onMouseMove={handleEnter}
          onMouseLeave={() => handleLeave(stock.price)}
          data={data}
        >
          <Line
            isAnimationActive={false}
            connectNulls={true}
            type="linear"
            dataKey="vw"
            stroke={strokeColor}
            dot={false}
            strokeWidth="2"
          />
          <ReferenceLine
            y={data[0].open}
            stroke="rgb(184, 181, 181)"
            strokeDasharray="3 3"
          />
          <XAxis hide={true} dataKey="label" />
          <YAxis domain={["auto", "auto"]} hide={true} />
          <Tooltip
            wrapperStyle={{ left: -30, fontSize: ".8em" }}
            isAnimationActive={false}
            filterNull={true}
            position={{ y: -20 }}
            content={<CustomTooltip />}
            payload={[{ name: "label", value: "vw" }]}
          />
        </LineChart>
      </ResponsiveContainer>
      <ul className={`time-frame`}>
        <li className={`selected ${dollarChangeDirection}`}>1M</li>
      </ul>
    </section>
  );
};

export default GraphComponent;
