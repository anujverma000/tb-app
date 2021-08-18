import { combineReducers, createStore } from "redux";
import { locationReducer } from "./locationReducer";

export const store = createStore(
  combineReducers({locations: locationReducer})
);
console.log(store.getState())