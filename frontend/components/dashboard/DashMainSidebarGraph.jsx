import React, {Component} from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {useSelector} from 'react-redux'

const DashMainSidebarGraph = ({data, symbol}) => {
    const percentageChange = useSelector(state => {
        debugger
        return state.entities.stocks[symbol].percentageChange;
    });
    const strokeColor = (percentageChange >= 0) ? "rgb(16, 197, 40)" : "#ff4f0b";
        return (
            <>
                <ResponsiveContainer>
                    <LineChart data={data}>
                        <Line isAnimationActive={false} connectNulls={true} type="linear" dataKey={"average"} stroke={strokeColor} dot={false} strokeWidth="2" />
                        <XAxis hide={true} dataKey="label" />
                        <YAxis domain={['auto', 'auto']} hide={true} />
                    </LineChart>
                </ResponsiveContainer>
            </>
        )

}

export default DashMainSidebarGraph;