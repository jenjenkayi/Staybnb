import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import {  } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

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
    history.push('/')
  };

  return (
    <div className="dropdown_menu">
      {sessionUser && <button className="profile_button" onClick={openMenu}>
        <i className="fa-solid fa-bars fa-lg"/>
        <i className="fas fa-user-circle fa-2xl"/>
      </button>}
      {showMenu && (
        <ul className="profile_dropdown">
          <li>Hi {user.username}!</li>
          <li>{user.email}</li>
          <button className="my_spots_button"
            onClick={() => history.push('/currentSpots')}>
            Manage Listings
          </button>
          <button className="my_reviews_button"
             onClick={() => history.push('/userReviews')}>
            Manage Reviews
          </button>
          <button className="my_bookings_button"
             onClick={() => history.push('/userBookings')}>
            Manage Bookings
          </button>
          <button className="log_out_button"
            onClick={logout}>
            Log Out
          </button>
        </ul>
    )}
    </div>
  );
}

export default ProfileButton;