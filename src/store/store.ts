import { compose, legacy_createStore, applyMiddleware, Middleware } from "redux";

import { rootReducer } from "./root-reducer";

import { persistStore, persistReducer, PersistConfig } from "redux-persist";

import storage from "redux-persist/lib/storage";

import logger from "redux-logger";

//import { thunk } from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./root-saga";



// Typing the root state itself in store cze it has the actual states of all reducer.
export type RootState = ReturnType<typeof rootReducer>


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;

  }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist:(keyof RootState)[]
}

const persistConfig: ExtendedPersistConfig = {
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
].filter((middleware): middleware is Middleware => Boolean (middleware));

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
