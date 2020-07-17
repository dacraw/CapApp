import React, { Component, useEffect } from 'react'
import SideBarNewWatchlistComponent from './SidebarNewWatchlistComponentContainer'
import SidebarWatchlist from './SidebarWatchlist'
import {useDispatch, useSelector} from 'react-redux'
import {fetchAllWatchlists} from '../../actions/watchlistActions'
import {Route} from 'react-router-dom'

export default (props) => {
// debugger
    const dispatch = useDispatch();
    useEffect( ()=> {
        dispatch(fetchAllWatchlists());
    }, []);

    const watchlists = useSelector(state => state.entities.watchlists);

    if (!Object.keys(watchlists).length) return null

    return (
        <div>
            {Object.values(watchlists).map( (watchlist, idx) => <SidebarWatchlist key={idx} watchlist={watchlist} />)}
        </div>
    )
}
