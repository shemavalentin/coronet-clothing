import { compose, legacy_createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";


// Following are step by step to write a store.
// creating a middleware

const middlewares = [logger];

// Calling compose for middleware to work, they are like inhancers

const composedEnhancers = compose(applyMiddleware(...middlewares))

export const store = legacy_createStore(rootReducer, undefined, composedEnhancers )