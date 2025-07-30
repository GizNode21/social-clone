import {createStore, combineReducers, applyMiddleware, compose } from "redux";
//import { configureStore } from "@reduxjs/toolkit";
//const { thunk } = require("redux-thunk");
import sessionReducer from "./session.js";
import logger from "redux-logger";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({ sessionReducer
});
let enhancer;
//let composeEnhancers;
if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    //try { composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ } catch (err) { composeEnhancers = compose };
    //enhancer = (getDefaultMiddleware) => getDefaultMiddleware().concat(logger.default);
    let composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : composeEnhancers = compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger.default));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
}
/*const createStore = (preloadedState) => {
    return configureStore({reducer: rootReducer, state: preloadedState, middleware: enhancer});
}*/

export default configureStore;