import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/card-dropdown/cart-dropdown.component";
import { ReactComponent as CoronetLogo } from '../../assets/crown.svg';
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.contenxt";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import './navigation.style.scss';

//Building navigation bar that will always stay on the page
const Navigation = () => {
  // Importing user context in navigation to use it
  const { currentUser } = useContext(UserContext);

  // bringing Cart context to naviagation component in order to use it

  const { isCartOpen } = useContext(CartContext);
  
  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to='/'>
          <CoronetLogo className=" logo " />
        </Link>
        <div className="nav-links-container">
          <Link className=" nav-link" to='/shop'>
            SHOP
          </Link>
          {/* We need to the logged in user the sign out option  */}

          {
            currentUser ? (
              <span className="nav-link" onClick={signOutUser}>
                {' '}
                SIGN OUT{' '}
              </span>
            ) : (
              <Link className=" nav-link" to='/auth'>
                SIGN IN
              </Link>
            )}
          <CartIcon />
        </div>
        {/* Using short circuit operator and the functions are alwayse truthy */}
        { isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
