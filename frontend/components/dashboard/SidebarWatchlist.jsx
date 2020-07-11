import React from 'react'
import {Link} from 'react-router-dom'
import DashMainSidebarGraph from './DashMainSidebarGraph'
import { useSelector } from 'react-redux'
import {Switch, Route, useLocation} from 'react-router-dom'


export default (props) => {
    const {watchlist} = props;
    
    const showOptions = (e) => {
        debugger
        e.stopPropagation();
        e.preventDefault();
        $('#watchlist-sidebar-options').show();
    }

    return (
        <Switch>
            <Route path="/watchlist/:id">
            <>
                <Link className="watchlist" to={`${watchlist.id}`}>
                    <i className="fas fa-lightbulb"></i>
                    <h2 className="watchlist-title">{watchlist.title}</h2>
                    <i onClick={showOptions} className="fas fa-ellipsis-h"></i>
                    <div id="watchlist-sidebar-options" className="watchlist-sidebar-options">
                        <h1>i here</h1>
                    </div>
                </Link>
            </>
            </Route>
            <Route path="/">
            <>
                <Link className="watchlist" to={`watchlist/${watchlist.id}`}>
                    <i class="fas fa-lightbulb"></i>
                    <h2 className="watchlist-title">{watchlist.title}</h2>
                    
                </Link>
            </>
            </Route>
        </Switch>
    )
};