import './NavBar.css'
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import logo from '../assets/logo.svg'
import user from '../assets/user.svg'
import shopping from '../assets/shopping.svg'
import { useSelector } from 'react-redux'

const NavBar = () => {
  const currentUser = useSelector(state => state.session.user);
  return (
    <>
      <div className="nav-bar-wrapper">
        <div className="inner-nav-container">

          <NavLink className="home-wrapper" to='/' exact={true} activeClassName='active'>
            <img className="snacc-logo" src={logo} />
            <div id="snacc-text">SNACC</div>
          </NavLink>




        {!currentUser ?
           (
            <>
              <div className="right-nav-wrapper2">
                <div id="login">
                  <NavLink to='/login' id="login2" exact={true} activeClassName='active'>
                    Login
                  </NavLink>
                </div>
                <div id="signup">
                  <NavLink to='/sign-up' id="signup2" exact={true} activeClassName='active'>
                    Sign Up
                  </NavLink>
                </div>
              </div>
            </>
          ) : (
            <>

              <div className="right-nav-wrapper">
              <div>
                  <NavLink to='/carts' id="cart-avatar" exact={true} activeClassName='active'>
                    <img className="cart-avatar" src={shopping} />
                  </NavLink>
                </div>
                
              {currentUser.id === 1 ? (
                <div>
                <NavLink to='/users' id="user-avatar" exact={true} activeClassName='active'>
                  <img className="user-avatar" src={user} />
                </NavLink>
              </div>
              ) : (<></>)
              }


                <div>
                  <LogoutButton />
                </div>
              </div>
            </>
          )}
          </div>
      </div>
      {/* break tags here to trivially create margins behind fixed navbar position*/}
      <br></br><br></br><br></br>
    </>
  );
}

export default NavBar;
