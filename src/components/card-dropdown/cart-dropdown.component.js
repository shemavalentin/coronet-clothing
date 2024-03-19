import React, { useContext } from 'react';

// A react hook to allow me navigate from one page to anather

import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../contexts/cart.contenxt';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import './cart-dropdown.styles.scss';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    // A function handler that calls Checkout page

    const goToCheckoutHandler = () => {
        navigate('/checkout')
    }

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {/* Getting items into cartItem dropdown  and increase the quantity,...*/}

                {cartItems.map(item => <CartItem key={ item.id } cartItem={item} />)}                
            </div>
            <Button onClick={ goToCheckoutHandler }> GO TO CHECKOUT </Button>
        </div>
    );
};

export default CartDropdown;