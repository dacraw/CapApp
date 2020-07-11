import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import WatchlistStock from './WatchlistStock'
import AddWatchedStock from './AddWatchedStock'
import {Redirect} from 'react-router-dom'

export default (props) => {
    const watchlists = useSelector(state => state.entities.watchlists)
    if (!Object.values(watchlists).length) return null
    debugger
    if (!(props.match.params.id in watchlists)) return <Redirect to="/dashboard" />
    let watchedStocks;
    // debugger
    if (props.match.params.id in watchlists && !!watchlists[props.match.params.id].watchedStocks){
        watchedStocks = watchlists[props.match.params.id].watchedStocks
    } else {
        watchedStocks = {}
    }
    return (
        <>
        <table className="watchlist-show">
            <tbody>
                <AddWatchedStock params={props.match.params} />
                <tr>
                    <th>Symbol</th>
                    <th>Company</th>
                    <th>Current Price</th>
                    <th>Daily % Change</th>
                </tr>
                {(Object.keys(watchedStocks).length) ? Object.values(watchedStocks).map(stock=><WatchlistStock key={stock.symbol} watchedStock={stock}/>) : ""}
            </tbody>
        </table>
        </>
    )
}