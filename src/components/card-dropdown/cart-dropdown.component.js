import React, { useContext } from 'react';
import { CartContext } from '../../contexts/cart.contenxt';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import './cart-dropdown.styles.scss';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>

                {/* Getting items into cartItem dropdown  and increase the quantity,...*/}

                {cartItems.map(item => <CartItem key={ item.id } cartItem={item} />)}
                
            </div>
            <Button>GO TO CHECK </Button>
        </div>
    );
};

export default CartDropdown;