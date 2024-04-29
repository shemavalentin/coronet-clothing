import { Middleware } from "redux";

import { RootState } from "../store";


export const loggerMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  // Here we write what we want our middleware to do (the middleware signature)
  if (!action.type) {
    return next(action);
  }
  console.log("type:", action.type);
  console.log("payload:", action.payload);
  console.log("currentState:", store.getState());

  next(action);

  console.log(" Next state:", store.getState);
};
