import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/root_reducer";

export default (preloadedState = {}) => {
  return configureStore({ reducer: rootReducer, preloadedState });
};
