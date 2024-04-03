import { compose, legacy_createStore, applyMiddleware } from "redux";
//import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

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

const middlewares = [loggerMiddleware];

// Calling compose for middleware to work, they are like inhancers

const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = legacy_createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

// Eporting persister object which calls persist store using the store object

export const persistor = persistStore(store);
