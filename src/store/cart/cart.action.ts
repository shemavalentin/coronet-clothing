
import { CategoryItem } from "../categories/category.types";
import { CART_ACTION_TYPES, CartItem } from "./cart.type";
import { createAction, withMatcher, Action, ActionWithPayload} from "../../utils/reducer/reducer.utils";

const addCartItem = (cartItems :CartItem[], productToAdd : CategoryItem) : CartItem[] => {
  //find if cartItems contains productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  // if found, increament quantity

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  // return new array with modified cartItems/ new cart item

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// Creating a helper function to remove cartItems from the checkout component.
const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // check if the quantity is equal to 1, if yes, remove that item from the cart.
  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }
  // return back cartItems with matching cart item with reduced quantity

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems : CartItem[], cartItemToClear : CartItem) : CartItem[] =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;


export const setIsCartOpen = withMatcher((boolean : boolean) : SetIsCartOpen =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)); // boolean is the value for the payload

// Creating Action Creator for SetCartItems for the following functions
export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems));

export const addItemToCart = (cartItems : CartItem[], productToAdd : CategoryItem) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems)
};

// Removing the Item
export const removeItemFromCart = (cartItems : CartItem[], cartItemToRemove : CartItem) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return setCartItems(newCartItems)
};
// Removing the Item
export const clearItemFromCart = (cartItems : CartItem[], cartItemToClear: CartItem) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return setCartItems(newCartItems)
};
