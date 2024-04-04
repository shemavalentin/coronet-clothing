import { compose, legacy_createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";

// Following are step by step to write a store.
// creating my own middleware(a currying func: a function that returns an other function )

// telling Redux persist what we want

const persistConfig = {
  key: "root",
  //storage: storage
  // or cast the key
  storage,

  // What we need to  not persist

  blacklist: ["user"],
};

// Creating a persisted reducer using persistConfig

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const middlewares = [process.env.NODE_ENV === "development" && logger].filter(
//   Boolean
// );
const middlewares = [
  process.env.NODE_ENV !== "production" && logger,
  thunk,
].filter(Boolean);

// Using Redux dev tool

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// Calling compose for middleware to work, they are like inhancers
//const composedEnhancers = compose(applyMiddleware(...middlewares));
const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = legacy_createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

// Eporting persister object which calls persist store using the store object

export const persistor = persistStore(store);