export const loggerMiddleware = (store) => (next) => (action) => {
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
