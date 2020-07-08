import sessionsErrorReducer  from './sessions_error_reducer';
import watchlistsErrorsReducer from './watchlistsErrorsReducer'
import {combineReducers} from 'redux';

export default combineReducers({
    session: sessionsErrorReducer,
    watchlists: watchlistsErrorsReducer,
})