import React, { createContext, useState, useEffect } from 'react';

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
    removeItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
});
 
export const CartProvider = ({ children }) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
        setCartTotal(newCartTotal);
    }, [cartItems]);

    // Function to triggers whenever user clicks on AddToCartButton and increase the quantity by 1
    // Once it is already in CartItemDropdown.

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    // Removing the Item
    const removeItemToCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }
    // Removing the Item
    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    }
    
    const value = { isCartOpen, setIsCartOpen, addItemToCart,removeItemToCart,clearItemFromCart,cartItems, cartCount, cartTotal };
     
    return <CartContext.Provider value={ value }>{ children }</CartContext.Provider>
}
