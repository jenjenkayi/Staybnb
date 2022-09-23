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
    <>
      <button className="profile_button" onClick={openMenu}>
        <i className="fa-solid fa-bars"/>
        <i className="fa-solid fa-user"/>
      </button>
      {showMenu && (
        <div className="profile_dropdown">
          <div>Hi {user.username}!</div>
          <div>{user.email}</div>
          <div>
          <button onClick={logout}>Log Out</button>
          <br></br>
          {/* <button onClick={() => history.push('/currentSpots')}>My Spots</button> */}
          <NavLink to={'/currentSpots'}>
              <button className="my-spots-button">My Spots</button>
             </NavLink>
          <br></br>
          <button onClick={() => history.push('/userReviews')}>My Reviews</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;