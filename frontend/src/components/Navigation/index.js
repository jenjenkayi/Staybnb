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
          src='https://user-images.githubusercontent.com/92122927/191890801-0f925610-8fbe-4e0d-a63f-330cf6fed796.png'
          alt=""
          onClick={() => history.push('/')}
          >
          </img>
          <div className='nav-host'
            onClick={() => history.push("/createSpot")}
            >
            Become a Host
          </div>
            {isLoaded && sessionLinks}
      </div>
  )
}

export default Navigation;