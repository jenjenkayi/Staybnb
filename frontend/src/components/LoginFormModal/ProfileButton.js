import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

function ProfileButton() {
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


  return (
    <div className="dropdown_menu">
      <button className="profile_button" onClick={openMenu}>
        <i className="fa-solid fa-bars fa-lg"/>
        <i className="fas fa-user-circle fa-2xl"/>
      </button>
      {showMenu && (
        <ul className="profile_dropdown">
          <li className="login_button"
            onClick={() => history.push('/currentSpots')}>
            Log In
          </li>
          <li className="my_reviews_button"
             onClick={() => history.push('/userReviews')}>
            Sign Up
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;