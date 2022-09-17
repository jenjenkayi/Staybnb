import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/api/spots">Become a Host</NavLink>
      </>
    );
  }

  return (
    <div className='NavContainer'>
      <div className='NavBar'>
        <NavLink exact to="/">Home</NavLink>
        <div className='NavBarRight'></div>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;