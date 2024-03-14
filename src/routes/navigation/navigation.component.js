import React from "react";
import { Outlet, Link } from "react-router-dom";
import './navigation.style.scss';

import { ReactComponent as CoronetLogo } from '../../assets/crown.svg';


//Building navigation bar that will always stay on the page
const Navigation = () => {
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

                <Link className=" nav-link" to= '/auth'>
                    SIGN IN 
          </Link>
          
            </div>
        </div>
        <Outlet/>
    </>
  )
}

export default Navigation;
