import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
// import * as actions from './actions/session_actions';

document.addEventListener('DOMContentLoaded', () => {
    window.onclick = function(e){
        document.getElementById('dash-nav-account-options').classList.remove('show');
        document.getElementById('sidebar-info-dropdown').classList.remove('show');
    }

    let store;
    if (window.currentUser){
        
        const preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: { id: window.currentUser.id }
        };
        store = configureStore(preloadedState);
    } else {
        store = configureStore();
    }
    // window.actions = actions;

    window.getState = store.getState;
    // hide dropdowns if user clicks on window
    window.onclick = function(e){
        document.getElementById('sidebar-info-dropdown').classList.remove('show');
        document.getElementById('dash-nav-account-options').classList.remove('show');
    }

    const root = document.getElementById('root');
    ReactDOM.render(<Root store={store} />, root)
})