import { createStore, applyMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import reducer from "./reducers/reducer";
import { devToolsEnhancer } from "redux-devtools-extension";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

export const store = createStore(
  reducer,
  devToolsEnhancer()
  // applyMiddleware(logger(), thunk, promise())
  // other store enhancers if any
);
