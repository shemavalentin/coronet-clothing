import React from "react";
import { useSelector } from "react-redux";

// A react hook to allow me navigate from one page to anather

import { useNavigate } from "react-router-dom";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../store/cart/cart.selector";
import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles.js";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  // A function handler that calls Checkout page

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage> Your cart is empty </EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}> GO TO CHECKOUT </Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
