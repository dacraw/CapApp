import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import configureStore from "./store/store";
import Root from "./components/root";
// import * as actions from './actions/session_actions';

document.addEventListener("DOMContentLoaded", () => {
  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser },
      },
      session: { id: window.currentUser.id },
    };
    store = configureStore(preloadedState);
  } else {
    store = configureStore();
  }
  // window.actions = actions;

  window.getState = store.getState;
  // hide dropdowns if user clicks on window
  window.onclick = function (e) {
    $("#sidebar-info-dropdown").fadeOut(200);
    $("#dash-nav-account-options").fadeOut(200);
    $("#stock-list ul").fadeOut(50);
    $(".watchlist-sidebar-options").fadeOut(50);
  };

  const domNode = document.getElementById("root");
  const root = createRoot(domNode);

  root.render(<Root store={store} />);
});
