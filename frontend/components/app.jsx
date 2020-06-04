import React from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginContainer from './session/login_container';
import SignupContainer from './session/signup_container';
import SplashNavBarContainer from './nav/splash_nav_bar_container';
import {AuthRoute} from '../util/route_util';
import {ProtRoute} from '../util/route_util';
import Dashboard from './dashboard/main';
import Splash from './splash/splash';

const App = (props) => {
    return (
        <>
            <Route exact path={["/"]} component={SplashNavBarContainer} />

            <Switch>
                <AuthRoute exact path="/signup" component={SignupContainer} />
                <AuthRoute exact path="/login" component={LoginContainer} />
                <ProtRoute exact path="/dashboard" component={Dashboard} /> {/* dash */}
                <Route exact path="/" component={Splash} /> {/* splash*/}
            </Switch>
        </>
    )
};

export default App