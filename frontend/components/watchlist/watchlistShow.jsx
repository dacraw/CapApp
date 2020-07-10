import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import WatchlistStock from './WatchlistStock'
import AddWatchedStock from './AddWatchedStock'

export default (props) => {
    const watchlists = useSelector(state => state.entities.watchlists)
    if (!Object.values(watchlists).length) return null

    const watchedStocks = watchlists[props.match.params.id].watchedStocks
    console.log(watchedStocks)
    return (
        <>
        <table>
            <tbody>
                <AddWatchedStock />
                <tr>
                    <th>Symbol</th>
                    <th>Company</th>
                    <th>Current Price</th>
                    <th>Daily % Change</th>
                </tr>
                {Object.values(watchedStocks).map(stock=><WatchlistStock key={stock.symbol} watchedStock={stock} />)}
            </tbody>
        </table>
        </>
    )
}