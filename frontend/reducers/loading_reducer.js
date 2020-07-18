import {START_LOADING_STOCK, RECEIVE_STOCK, START_LOADING_STOCKS, RECEIVE_STOCKS} from '../actions/stock_actions'
import {START_LOADING_NEWS, RECEIVE_NEWS} from '../actions/newsActions'
import {START_LOADING_WATCHLIST, RECEIVE_SINGLE_WATCHLIST} from '../actions/watchlistActions'
import { START_LOADING_PORTFOLIOS, RECEIVE_PORTFOLIOS, START_CREATING_PORTFOLIO, RECEIVE_PORTFOLIO } from '../actions/portfolio_actions';
import {merge} from 'lodash'

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case START_LOADING_STOCK:
            return merge({}, state, {stockLoader: true})     
        case RECEIVE_STOCK:
            return merge({}, state, {stockLoader: false})    
        case START_LOADING_STOCKS:
            return merge({}, state, {stockLoader: true})      
        case RECEIVE_STOCKS:
            return merge({}, state, {stockLoader: false})   
        case START_LOADING_NEWS:
            return merge({}, state, {newsLoader: true})  
            case RECEIVE_NEWS:
            return merge({}, state, {newsLoader: false})  
        case START_LOADING_WATCHLIST:
            return merge({}, state, {watchlistLoader: true})   
        case RECEIVE_SINGLE_WATCHLIST:
            return merge({}, state, {watchlistLoader: false})   
        case START_LOADING_PORTFOLIOS:
            return merge({}, state, {portfolioLoader: true})   
        case RECEIVE_PORTFOLIOS:
            return merge({}, state, {portfolioLoader: false})   
        case START_CREATING_PORTFOLIO:
            return merge({}, state, {portfolioLoader: true})   
        case RECEIVE_PORTFOLIO:
            return merge({}, state, {portfolioLoader: false})   
        default:
            return state
    }
}