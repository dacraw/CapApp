import { RECEIVE_STOCK, RECEIVE_STOCKS } from "../actions/stock_actions";
import { LOGOUT_CURRENT_USER } from "../actions/session_actions";
import { merge } from "lodash";

const _nullState = {};

export default (state = {}, action) => {
  let nextState = {};
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_STOCK:
      nextState = merge({}, state, action.stock);
      let symbol;
      if (Object.keys(action.stock).length) {
        symbol = Object.keys(action.stock)[0];
        nextState[symbol].chart = action.stock[symbol].chart;
      }

      return nextState;
    case RECEIVE_STOCKS:
      // using stock data

      return merge({}, state, action.stocks);
    case LOGOUT_CURRENT_USER:
      return _nullState;
    default:
      return state;
  }
};
