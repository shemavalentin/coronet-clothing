import { createSelector } from "reselect";

import { RootState } from "../store";

import { CartState } from "./cart.reducer";

//extracting the reducer/slice state
const selectCartReducer = (state : RootState) : CartState => state.cart;

// Getting the actual cart items off of this slice/ this will be memoized
export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
);
