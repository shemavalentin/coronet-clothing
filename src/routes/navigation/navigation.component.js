import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/card-dropdown/cart-dropdown.component";
import { ReactComponent as CoronetLogo } from '../../assets/crown.svg';
import { CartContext } from "../../contexts/cart.contenxt";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import { NavigationContainer, NavLinks, NavLink, LogoContainer } from './navigation.style';

//Building navigation bar that will always stay on the page
const Navigation = () => {
 const currentUser = useSelector((state) => state.user.currentUser)
  // Importing user context in navigation to use it
  // const { currentUser } = useContext(UserContext);

  // bringing Cart context to naviagation component in order to use it

  const { isCartOpen } = useContext(CartContext);
  return (
    <>
      <NavigationContainer>

        <LogoContainer to='/'>
          <CoronetLogo className=" logo " />
        </LogoContainer>

        <NavLinks>
          <NavLink to='/shop'> SHOP </NavLink>

          {/* We need to the logged in user the sign out option  */}

          {
            currentUser ? (
              <NavLink as = 'span' onClick={signOutUser}>
                {' '}
                SIGN OUT{' '}
              </NavLink>
            ) : (
              <NavLink to='/auth'>
                SIGN IN
              </NavLink>
            )}
          <CartIcon />
        </NavLinks>
         {/* Using short circuit operator and the functions are alwayse truthy */}
        { isCartOpen && <CartDropdown />} 
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;
