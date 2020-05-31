import React from 'react';
import {Route, Switch} from 'react-router-dom';
import SignupContainer from './session/signup_container';
import LoginContainer from './session/login_container';
import NavBarContainer from './other/nav_bar_container';
import {AuthRoute} from '../util/route_util';
import {ProtRoute} from '../util/route_util';
import Dashboard from './dashboard/main';

const App = (props) => {
    return (
        <>
            <header>
                <NavBarContainer />
            </header>
            <Switch>
                <AuthRoute exact path="/signup" component={SignupContainer} />
                <AuthRoute exact path="/login" component={LoginContainer} />
                <ProtRoute exact path="/" component={Dashboard} /> {/* placeholder */}
            </Switch>
        </>
    )
};

export default App