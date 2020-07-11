import React from 'react'
import {Link} from 'react-router-dom'
import DashMainSidebarGraph from './DashMainSidebarGraph'
import { useSelector } from 'react-redux'


export default ({watchlist}) => {
    return (
        <>
            <Link className="watchlist" to={`watchlist/${watchlist.id}`}>
                <i class="fas fa-lightbulb"></i>
                <h2 className="watchlist-title">{watchlist.title}</h2>
            </Link>
        </>
    )
};