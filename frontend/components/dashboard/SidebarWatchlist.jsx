import React from 'react'
import {Link} from 'react-router-dom'
import DashMainSidebarGraph from './DashMainSidebarGraph'
import { useSelector } from 'react-redux'
import {Switch, Route, useLocation} from 'react-router-dom'


export default (props) => {
    debugger
    const {watchlist} = props;
    const location = useLocation();
    // const linkPath = ()
    return (
        <Switch>
            <Route path="/watchlist/:id">
            <>
                <Link className="watchlist" to={`${watchlist.id}`}>
                    <i class="fas fa-lightbulb"></i>
                    <h2 className="watchlist-title">{watchlist.title}</h2>
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