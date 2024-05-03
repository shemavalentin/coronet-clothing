import { useCallback } from "react";
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
  //const [temp, setTemp] = useState("A");

  // A function handler that calls Checkout page
  // Using callback to optimize or memoize the goToCheckOutHandler function

  const goToCheckoutHandler = useCallback(() => {
    //console.log(temp);
    navigate("/checkout");
  }, []);

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
      {/* <Button onClick={() => setTemp("B")}> Update </Button> */}
    </CartDropdownContainer>
  );
};

export default CartDropdown;

//useMemo: a hook that memoize the return value

// useCallback: a hook that used to memoize the function.
