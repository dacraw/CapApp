import React from 'react';
import ReactDOM from 'react-dom';
import * as APIUtil from './util/session_api_util';

document.addEventListener('DOMContentLoaded', () => {
    window.APIUtil = APIUtil;

    const root = document.getElementById('root');
    ReactDOM.render(<h1>It works</h1>, root)
})