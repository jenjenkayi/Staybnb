import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory, NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
import GetCurrentSpots from '../GetCurrentSpots/GetCurrentSpots';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  
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

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };


  return (
    <div className="dropdown_menu">
      <button className="profile_button" onClick={openMenu}>
        <i className="fa-solid fa-bars"/>
        <br></br>
        <i className="fas fa-user-circle fa-2xl"/>
      </button>
      {showMenu && (
        <div className="profile_dropdown">
          <div>Hi {user.username}!</div>
          <div>{user.email}</div>
          <div>
          <button onClick={logout}>Log Out</button>
          <br></br>
          <NavLink to={'/currentSpots'}>
              <button className="my-spots-button">My Spots</button>
             </NavLink>
          <br></br>
          <button onClick={() => history.push('/userReviews')}>My Reviews</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;