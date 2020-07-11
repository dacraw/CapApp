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
        const watchlistID = e.currentTarget.getAttribute('data-key')
        $(`.watchlist-options-${watchlistID}`).toggle();
    }

    return (
        <Switch>
            <Route path="/watchlist/:id">
            <>
                <Link className="watchlist" to={`${watchlist.id}`}>
                    <i className="fas fa-lightbulb"></i>
                    <h2 className="watchlist-title">{watchlist.title}</h2>
                    <i onClick={showOptions} key={watchlist.id} data-key={watchlist.id} className="fas fa-ellipsis-h">
                        <div className={`watchlist-sidebar-options watchlist-options-${watchlist.id}`}>
                            <Link to={`${watchlist.id}`}>Edit List</Link>
                            <button type="button">Delete List</button>
                        </div>
                    </i>
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