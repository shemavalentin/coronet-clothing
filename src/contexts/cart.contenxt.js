import React, { createContext, useState, useEffect, useReducer } from 'react';

// Helper function to help in finding in existing array and increase it if found one match the ID
// Otherwise make an other cartItem.

const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems contains productToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
    // if found, increament quantity

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem )
    }
    // return new array with modified cartItems/ new cart item

    return [ ...cartItems, { ...productToAdd, quantity: 1}]
}

// Creating a helper function to remove cartItems from the checkout component.
const removeCartItem = (cartItems, cartItemToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

    // check if the quantity is equal to 1, if yes, remove that item from the cart.
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }
    // return back cartItems with matching cart item with reduced quantity

    return cartItems.map((cartItem) =>
            cartItem.id === cartItemToRemove.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem )
}

///  A HELPER FUNCTION TO CLEAR CART

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
    isCartOpen: false,
    setCartIsOpen: () => { },
    cartItems: [],
    // function to add to quantity separately and control it. 
    addItemToCart: () => { },

    //function to clear item from cart

    clearItemFromCart: () => { },
    
    // function to remove item
    removeItemFromCart: () => { },
    
    cartCount: 0,
    cartTotal: 0
});
 
// Let's use Reducers and store only readable values and reducers only stores only readable values.

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
};

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:

            return {
                ...state,
                ...payload
            };
        
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        
        default:
            throw new Error(`Unhandled type of ${type} in cartReducer`);
    }    
}

export const CartProvider = ({ children }) => {

    const [{cartItems, isCartOpen, cartCount, cartTotal  }, dispatch] = useReducer(cartReducer, INITIAL_STATE)
    
    const updateCartItemsReducer = (newCartItems) => {

        // Generate newCartCount

        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

// Generate newCartTotal
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

        dispatch({ type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: { cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount } });
    }

    // Function to triggers whenever user clicks on AddToCartButton and increase the quantity by 1
    // Once it is already in CartItemDropdown.

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    // Removing the Item
    const removeItemToCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    };
    // Removing the Item
    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    };
    
    // Setting a function to control isCartOpen
    
    const setIsCartOpen = (bool) => {
        dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool });
    }

    const value = { isCartOpen, setIsCartOpen , addItemToCart,removeItemToCart,clearItemFromCart,cartItems, cartCount, cartTotal };
     
    return <CartContext.Provider value={ value }>{ children }</CartContext.Provider>
}
