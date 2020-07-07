import React, { Component } from 'react'
import SideBarNewWatchlistComponent from './SidebarNewWatchlistComponent'

export default class SidebarWatchedStocks extends Component {
    render() {
        return (
            <div>
                <h1 className="title">Watchlists:</h1>
                <SideBarNewWatchlistComponent />
            </div>
        )
    }
}
