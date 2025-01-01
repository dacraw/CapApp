import React from "react";
import { Link } from "react-router";
import DashMainSidebarGraph from "./DashMainSidebarGraph";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, useLocation, Redirect } from "react-router";
import { deleteWatchlist } from "../../actions/watchlistActions";

export default (props) => {
  const { watchlist } = props;

  const showOptions = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const watchlistID = e.currentTarget.getAttribute("data-key");
    $(`.watchlist-options-${watchlistID}`).toggle();
  };

  const dispatch = useDispatch();

  const hideOptions = () => {
    $(".watchlist-sidebar-options").hide();
  };

  return (
    <div>
      <Link
        onMouseEnter={() => hideOptions()}
        className="watchlist"
        to={`watchlist/${watchlist.id}`}
      >
        <i className="fas fa-lightbulb"></i>
        <h2 className="watchlist-title">{watchlist.title}</h2>
        <i
          onClick={showOptions}
          key={watchlist.id}
          data-key={watchlist.id}
          className="fas fa-ellipsis-h"
        >
          <div
            className={`watchlist-sidebar-options watchlist-options-${watchlist.id}`}
          >
            <button
              onClick={() => dispatch(deleteWatchlist(watchlist.id))}
              type="button"
            >
              <i className="far fa-times-circle"></i>Delete List
            </button>
          </div>
        </i>
      </Link>
    </div>
  );
};
