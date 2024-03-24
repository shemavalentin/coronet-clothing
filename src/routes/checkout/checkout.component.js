import React, { useContext } from "react";
import { CartContext } from '../../contexts/cart.contenxt';
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { CheckouContainer, CheckoutHeader, HeaderBlock, Total} from './checkout.styles'

const Checkout = () => {
    //getting cars from CartContext
    const { cartItems, cartTotal } = useContext(CartContext);
    return (
        <CheckouContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span> Product </span>                   
                </HeaderBlock>
                <HeaderBlock>
                    <span> Description </span>
                </HeaderBlock>
                <HeaderBlock>
                    <span> Quantity </span>
                </HeaderBlock>
                <HeaderBlock>
                    <span> Price </span>
                </HeaderBlock>
                <HeaderBlock>
                    <span> Remove </span>
                </HeaderBlock>
            </CheckoutHeader>
            {
                cartItems.map((cartItem) => {
                    return <CheckoutItem key={cartItem.id} cartItem={cartItem}/>                      
                })
            }
            <Total>Total: { cartTotal } RWF </Total>
        </CheckouContainer>
    )
}

export default Checkout;
