import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import WatchlistStock from './WatchlistStock'

export default (props) => {
    const watchlists = useSelector(state => state.entities.watchlists)
    if (!Object.values(watchlists).length) return null

    debugger
    const watchedStocks = watchlists[props.match.params.id].watchedStocks
    console.log(watchedStocks)
    return (
        <>
        <table>
            <tbody>
                <th>Symbol</th>
                <th>Company</th>
                <th>Current Price</th>
                <th>Daily % Change</th>
                {Object.values(watchedStocks).map(stock=><WatchlistStock key={stock.symbol} watchedStock={stock} />)}
            </tbody>
        </table>
        </>
    )
}