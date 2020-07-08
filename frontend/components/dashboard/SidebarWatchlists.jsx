import React, { Component, useEffect } from 'react'
import SideBarNewWatchlistComponent from './SidebarNewWatchlistComponent'
import SidebarWatchlist from './SidebarWatchlist'
import {useDispatch, useSelector} from 'react-redux'
import {fetchAllWatchlists} from '../../actions/watchlistActions'

export default (props) => {
    const dispatch = useDispatch();
    useEffect( ()=> {
        dispatch(fetchAllWatchlists());
    }, []);

    debugger
    const watchlists = useSelector(state => state.entities.watchlists);
    if (!Object.keys(watchlists).length) return null


    return (
        <div>
            <h1 className="title">Watchlists:</h1>
            <SideBarNewWatchlistComponent />
            {Object.values(watchlists).map( watchlist => <SidebarWatchlist watchlist={watchlist} />)}
        </div>
    )
}
