import React from 'react';
import {Route} from 'react-router-dom';
import SignupContainer from './session/signup_container';
import LoginContainer from './session/login_container';
import GreetingContainer from './other/greeting_container';

const App = (props) => {
    return (
        <>
            <GreetingContainer />
            <Route path="/signup" component={SignupContainer} />
            <Route path="/login" component={LoginContainer} />
        </>
    )
};

export default App