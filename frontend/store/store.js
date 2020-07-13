import {createStore, applyMiddleware, compose} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root_reducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (preloadedState = {} ) => {
    debugger
    switch (window.environment) {
        case 'development':
            return createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(thunk, logger)))
        default:
            return createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(thunk)))

    }
};