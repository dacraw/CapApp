import React from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginContainer from './session/login_container';
import SignupContainer from './session/signup_container';
import NavBarContainer from './nav_bar/nav_bar_container';
import DashNavBarContainer from './nav_bar/dash_nav_bar_container';
import {AuthRoute} from '../util/route_util';
import {ProtRoute} from '../util/route_util';
import Dashboard from './functional_component/functional_component';
import Splash from './splash/splash';
import FunctionalComponent from './functional_component/functional_component_container';

const App = (props) => {
    
    return (
        <>
            <header>
                <Route exact path="/" component={NavBarContainer} />
                <Route exact path={["/dashboard","/stocks","/stocks/:symbol"]} component={DashNavBarContainer} />
            </header>
            <Switch>
                <AuthRoute exact path="/signup" component={SignupContainer} />
                <AuthRoute exact path="/login" component={LoginContainer} />
                <ProtRoute exact path="/dashboard" component={Dashboard} /> {/* dash */}
                <ProtRoute exact path="/stocks/:symbol" component={FunctionalComponent} /> {/* dash */}
                <Route exact path="/" component={Splash} /> {/* splash*/}
            </Switch>
        </>
    )
};

export default App