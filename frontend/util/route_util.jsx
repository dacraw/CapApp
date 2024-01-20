import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const AuthRoute = () => {
  const loggedIn = useSelector((state) => state.session.id);
  return loggedIn ? <Navigate to="/dashboard" /> : <Outlet />;
  // <Routes>
  //   <Route path={path} exact={exact}>
  //     {loggedIn ? <Navigate to="/dashboard" /> : <Component {...props} />}
  //   </Route>
  // </Routes>
};

export const ProtRoute = () => {
  const loggedIn = useSelector((state) => state.session.id);
  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
  // <Routes>
  //   <Route path={path} exact={exact}>
  //     {loggedIn ? <Component {...props} /> : <Navigate to="/" />}
  //   </Route>
  // </Routes>
};
