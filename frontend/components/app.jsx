import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginContainer from "./session/login_container";
import SignupContainer from "./session/signup_container";

import { AuthRoute } from "../util/route_util";
import { ProtRoute } from "../util/route_util";
import Splash from "./splash/splash";
import Dashboard from "./dashboard/dashboard";
import StockShow from "./stock_show/stock_show";
import WatchlistShow from "./watchlist/watchlistShow";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Splash />} />

        <Route element={<ProtRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stocks/:symbol" element={<StockShow />} />
          <Route path="/dashboard/watchlist/:id" element={<WatchlistShow />} />
        </Route>

        <Route element={<AuthRoute />}>
          <Route exact path="/signup" element={<SignupContainer />} />
          <Route exact path="/login" element={<LoginContainer />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
