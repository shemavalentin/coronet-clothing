import { UnknownAction } from "redux";

import { setCartItems, setIsCartOpen} from "./cart.action";

import { CartItem } from "./cart.type";

// Typing the actual cart state

export type CartState = {
  readonly isCartOpen: boolean;
  readonly cartItems: CartItem[];
}

export const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (state = CART_INITIAL_STATE, action: UnknownAction): CartState => {
  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload
    };
  }

  if (setCartItems.match(action)) {
    return {
        ...state,
        cartItems: action.payload,
      };
  }

  return state;

};
