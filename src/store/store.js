import { compose, legacy_createStore, applyMiddleware } from "redux";
//import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

// Following are step by step to write a store.
// creating my own middleware(a currying func: a function that returns an other function )

const loggerMiddleware = (store) => (next) => (action) => {
  // Here we write what we want our middleware to do (the middleware signature)
  if (!action.type) {
    return next(action);
  }
  console.log("type:", action.type);
  console.log("payload:", action.payload);
  console.log("current state:", store.getState());

  next(action);

  console.log(" Next state:", store.getState);
};
const middlewares = [loggerMiddleware];

// Calling compose for middleware to work, they are like inhancers

const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = legacy_createStore(
  rootReducer,
  undefined,
  composedEnhancers
);
