import React from 'react'
import {Link} from 'react-router-dom'
import DashMainSidebarGraph from './DashMainSidebarGraph'
import { useSelector } from 'react-redux'


export default ({watchlist}) => {
    
    return (
        <>
            <li className="watchlist">
                <div className="icon">X</div>
                <div className="title">{watchlist.title}</div>
            </li>
        </>
    )
};