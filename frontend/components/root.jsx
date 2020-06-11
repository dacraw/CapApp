import React from 'react';
import { Provider } from 'react-redux';
import App from './app';
import { HashRouter } from 'react-router-dom';
import ScrollToTop from './util/scroll_to_top'

const Root = ({ store }) => {
    return (
        <>
            <Provider store={store}>
                <HashRouter>
                    <ScrollToTop>
                        <App />
                    </ScrollToTop>
                </HashRouter>
            </Provider>
        </>
    )
};
export default Root