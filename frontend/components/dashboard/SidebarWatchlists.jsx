import React, { Component, useEffect } from 'react'
import SideBarNewWatchlistComponent from './SidebarNewWatchlistComponentContainer'
import SidebarWatchlist from './SidebarWatchlist'
import {useDispatch, useSelector} from 'react-redux'
import {fetchAllWatchlists} from '../../actions/watchlistActions'

export default (props) => {
    const dispatch = useDispatch();
    useEffect( ()=> {
        dispatch(fetchAllWatchlists());
    }, []);

    const watchlists = useSelector(state => state.entities.watchlists);

    useEffect( ()=> {
        debugger
        if (document.querySelector('#add-new-watchlist')) document.querySelector('#add-new-watchlist').style.display = "none";        
    }, [watchlists])

    if (!Object.keys(watchlists).length) return null

    const newWatchlist = () => {
        debugger
        document.querySelector('#add-new-watchlist').style.display = "flex";
    }

    return (
        <div>
            <div className="sidebar-header">
                <h1 className="title">Watchlists:</h1>
                <i onClick={newWatchlist} className="far fa-plus-square"></i>
            </div>
            <SideBarNewWatchlistComponent />
            {Object.values(watchlists).map( watchlist => <SidebarWatchlist watchlist={watchlist} />)}
        </div>
    )
}
