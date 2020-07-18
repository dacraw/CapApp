import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import WatchlistStock from './WatchlistStock'
import AddWatchedStock from './AddWatchedStock'
import {Redirect} from 'react-router-dom'

export default (props) => {
    const watchlists = useSelector(state => state.entities.watchlists)
    if (!Object.values(watchlists).length) return null
    if (!(props.match.params.id in watchlists)) return <Redirect to="/dashboard" />
    const watchlistID = props.match.params.id;
    const watchlist = watchlists[watchlistID];
    let watchedStocks;
    
    if (watchlistID in watchlists && !!watchlist.watchedStocks){
        watchedStocks = watchlist.watchedStocks
    } else {
        watchedStocks = {}
    }
    return (
        <>
        <h1 className="watchlist-show-title">{watchlists[props.match.params.id].title}</h1>
        <h5 className="watchlist-show-num-items">{Object.keys(watchedStocks).length} items</h5>
        <table className="watchlist-show">
            <tbody>
                <AddWatchedStock params={props.match.params} />
                <tr>
                    <th>Symbol</th>
                    <th>Company</th>
                    <th>Current Price</th>
                    <th>Daily % Change</th>
                    <th></th>
                </tr>
                {(Object.keys(watchedStocks).length) ? Object.values(watchedStocks).map(stock=><WatchlistStock key={stock.symbol} watchedStock={stock}/>) : ""}
            </tbody>
        </table>
        </>
    )
}