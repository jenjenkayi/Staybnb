import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        {/* <NavLink to="/login">Log In</NavLink> */}
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/api/spots">Become a Host</NavLink>
      </>
    );
  }

  return (
    <div className='NavContainer'>
      {/* <img className='logo' src='https://www.refinery29.com/en-us/2014/07/71366/airbnb-logo-rebrand'
      alt="logo"
      onClick={() => history.push('/')}
      >
      </img> */}
      <div className='NavBar'>
        <NavLink exact to="/">Home</NavLink>
        <div className='NavBarRight'></div>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;