import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import SignupFormPage from '../SignupFormPage';
import './Navigation.css';

function Navigation({ isLoaded }){
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
        {/* <NavLink to="/signup">Sign Up</NavLink> */}
        <SignupFormModal />
      </>
    );
  }

  // const openMenu = () => {
  //   if (showMenu) return;
  //   setShowMenu(true);
  // };
  
  // useEffect(() => {
  //   if (!showMenu) return;

  //   const closeMenu = () => {
  //     setShowMenu(false);
  //   };

  //   document.addEventListener('click', closeMenu);
  
  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showMenu]);

  return (
      <div className='nav_wrapper'>
        <img
          className='nav_logo'
          src='https://user-images.githubusercontent.com/92122927/191908093-f94f94f2-c679-4e28-94e5-4d0ac62f8ba6.png'
          alt=""
          onClick={() => history.push('/')}
          >
          </img>
        <div className='nav_host_button'
            onClick={() => history.push("/createSpot")}
            >
            Become a Host
          </div>
            {isLoaded && sessionLinks}
      </div>
  )
}

export default Navigation;