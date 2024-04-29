import { Middleware } from "redux";

import { RootState } from "../store";

export const loggerMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  if (!action) {
    return next(action);
  }
  console.log("type:", action);
  console.log("payload:", action);
  console.log("currentState:", store.getState());

  next(action);

  console.log(" Next state:", store.getState);
};
