import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartCount,
  selectIsCartOpen,
} from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action.js";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartIconContainer, ItemCount } from "./cart-icon.styles";

const CartIcon = () => {
  //const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);

  // Declraring the value
  const isCartOpen = useSelector(selectIsCartOpen);

  // creating a toggle function to call the cart's state.

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className=" shopping-Icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
