import React, { createContext, useState, useEffect } from 'react';


// Helper function to help in finding in existing array and increase it if found one match the ID
// Otherwise make an other cartItem.

const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems contains productToAdd

    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
    // if found, increament wuantity

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem )
    }
    // return new array with modified cartItems/ new cart item

    return [ ...cartItems, { ...productToAdd, quantity: 1}]
}

export const CartContext = createContext({
    isCartOpen: false,
    setCartIsOpen: () => { },
    cartItems: [],

    // function to add to quantity separately and control it. 
    addItemToCart: () => { },
    cartCount: 0
});

export const CartProvider = ({ children }) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems]);

    // Funtion to triggers whenever user clicks on AddToCartButton and increase the quantity by 1
    // Once it is already in CartItemDropdown.

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart,cartItems, cartCount };
     
    return <CartContext.Provider value={ value }>{ children }</CartContext.Provider>
}
