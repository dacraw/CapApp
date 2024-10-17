import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { useSelector } from "react-redux";

const DashMainSidebarGraph = ({ data, symbol, percentageChange }) => {
  const strokeColor = percentageChange >= 0 ? "rgb(16, 197, 40)" : "#ff4f0b";

  return (
    <>
      <ResponsiveContainer>
        <LineChart data={data}>
          <Line
            isAnimationActive={false}
            connectNulls={true}
            type="linear"
            dataKey={"vw"}
            stroke={strokeColor}
            dot={false}
            strokeWidth=".5"
          />
          <ReferenceLine
            y={data[0].open}
            stroke="rgb(184, 181, 181)"
            strokeDasharray="3 3"
          />
          <XAxis hide={true} dataKey="label" />
          <YAxis domain={["auto", "auto"]} hide={true} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default DashMainSidebarGraph;
