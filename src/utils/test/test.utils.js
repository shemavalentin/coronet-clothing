import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "redux";
import { rootReducer } from "../../store/root-reducer";

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore(rootReducer, preloadedState),
    ...renderOptions
  } = {}
) {
  // Defining the new component to wrap the ui that is going to be wrapped.
  const Wrapper = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
