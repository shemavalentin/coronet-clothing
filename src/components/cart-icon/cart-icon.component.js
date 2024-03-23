import React, { useContext } from "react";
import { CartContext } from "../../contexts/cart.contenxt";
import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles'

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    // creating a toggle function to call the cart's state.
    
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
        <ShoppingIcon className = ' shopping-Icon' />
            <ItemCount>{ cartCount }</ItemCount>
        </CartIconContainer> 
    )
};

export default CartIcon;