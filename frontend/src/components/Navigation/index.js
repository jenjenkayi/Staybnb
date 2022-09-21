import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormPage from '../SignupFormPage';
import './Navigation.css';

export default function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
      <div className='nav-container'>
        <img
          className='logo'
          src="https://en.logodownload.org/airbnb-logo/"
          alt="airbnb"
          onClick={() => history.push('/')}
          >
          </img>
          <div className='nav-host'
            onClick={() => history.push("/createSpot")}
            >
            Become a Host
          </div>
            {isLoaded && sessionLinks}
          {/* <div className='nav-menu-button'>{isLoaded && sessionLinks}</div> */}
            {/* <button onClick={openMenu}>
              <i className="fa-solid fa-bars"/>
              <i className="fa-solid fa-user"/> */}
            {/* {showMenu && (
              <ul className="menu-dropdown">
                <li>
                  <button onClick={() => history.push('/login')}>Log In</button>
                </li>
                <li>
                  <button onClick={() => history.push('/signup')}>Sign Up</button>
                </li>
              </ul> */}
            {/* )} */}
            {/* </button> */}
      </div>
  )
}