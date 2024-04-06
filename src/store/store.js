import { compose, legacy_createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
//import { thunk } from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

// Following are step by step to write a store.
// creating my own middleware(a currying func: a function that returns an other function )

// telling Redux persist what we want

const persistConfig = {
  key: "root",
  //storage: storage
  // or cast the key
  storage,

  // What we need to  not persist in local storage persistaance.
  //blacklist: ["user"],
  // We only need to persist on cart.
  whitelist: ["cart"],
};

// Creating SagaMiddleware
const SagaMiddleware = createSagaMiddleware();
// Creating a persisted reducer using persistConfig
const persistedReducer = persistReducer(persistConfig, rootReducer);

// const middlewares = [process.env.NODE_ENV === "development" && logger].filter(
//   Boolean
// );
const middlewares = [
  process.env.NODE_ENV !== "production" && logger,
  //thunk,
  SagaMiddleware,
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

// Calling the sagaMiddleware to run

SagaMiddleware.run(rootSaga);

// Eporting persistor object which calls persist store using the store object

export const persistor = persistStore(store);
