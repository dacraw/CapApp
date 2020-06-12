import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

const Auth = ({component: Component, path, loggedIn, exact }) => (
    <Route
        path={path}
        exact={exact}
        render={(props)=>(
            !loggedIn ? ( <Component {...props} /> )
            : ( <Redirect to="/stocks/goog" /> )
        )}
    />
);

const Prot = ({ component: Component, exact, loggedIn, path }) => (
    <Route
        path={path}
        exact={exact}
        render={(props) => (
            loggedIn ? <Component {...props} /> 
            : <Redirect to="/" />
        )}
    />
)

const mapStateToProps = state => ({
    loggedIn: Boolean(state.session.id)
});

export const AuthRoute = connect(mapStateToProps)(Auth);
export const ProtRoute = connect(mapStateToProps)(Prot);