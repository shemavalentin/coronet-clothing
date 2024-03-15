import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import './navigation.style.scss';
import { ReactComponent as CoronetLogo } from '../../assets/crown.svg';
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { signInAnonymously } from "firebase/auth";


//Building navigation bar that will always stay on the page
const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to ='/'>
          <CoronetLogo className=" logo "/>                
        </Link>       
        <div className="nav-links-container">
          <Link className=" nav-link" to= '/shop'>
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
          </div>
        </div>
      <Outlet/>
    </>
  )
}

export default Navigation;
