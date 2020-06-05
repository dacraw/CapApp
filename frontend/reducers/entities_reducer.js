import {combineReducers} from 'redux';
import usersReducer from './users_reducer';
import portfolioReducer from './portfolios_reducer';
import stocksReducer from './stocks_reducer'

export default combineReducers({
    users: usersReducer,
    portfolios: portfolioReducer,
    stocks: stocksReducer,
})