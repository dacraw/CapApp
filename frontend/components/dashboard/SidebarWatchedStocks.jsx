import React, { Component, useEffect } from 'react'
import SideBarNewWatchlistComponent from './SidebarNewWatchlistComponent'
import {useDispatch} from 'react-redux'
import {fetchAllWatchlists} from '../../actions/watchlistActions'

export default (props) => {
    const dispatch = useDispatch();
    useEffect( ()=> {
        dispatch(fetchAllWatchlists());
    }, []);

    return (
        <div>
            <h1 className="title">Watchlists:</h1>
            <SideBarNewWatchlistComponent />
        </div>
    )
}
