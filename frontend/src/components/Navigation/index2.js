import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
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
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;


// import React from 'react';
// import { useState, useEffect } from 'react';
// import { NavLink, useHistory } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import LoginFormModal from '../LoginFormModal';
// import SignupFormPage from '../SignupFormPage';
// import './Navigation.css';

// export default function Navigation({ isLoaded }){
//   const sessionUser = useSelector(state => state.session.user);
//   const history = useHistory();
//   const [showMenu, setShowMenu] = useState(false);

//   let sessionLinks;
//   if (sessionUser) {
//     sessionLinks = (
//       <ProfileButton user={sessionUser} />
//     );
//   } else {
//     sessionLinks = (
//       <>
//         {/* <LoginFormModal /> */}
//         {/* <NavLink to="/signup">Sign Up</NavLink>
//         <NavLink to="/api/spots">Become a Host</NavLink> */}
//       </>
//     );
//   }

//   const openMenu = () => {
//     if (showMenu) return;
//     setShowMenu(true);
//   };
  
//   useEffect(() => {
//     if (!showMenu) return;

//     const closeMenu = () => {
//       setShowMenu(false);
//     };

//     document.addEventListener('click', closeMenu);
  
//     return () => document.removeEventListener("click", closeMenu);
//   }, [showMenu]);

//   return (
//       <div className='nav-container'>
//         <img
//           className='logo'
//           src="https://en.logodownload.org/airbnb-logo/"
//           alt="airbnb"
//           onClick={() => history.push('/')}
//           >
//           </img>
//           <div className='nav-host'
//             onClick={() => history.push("/createSpot")}
//           >
//             Become a Host
//           </div>
//           <div className='nav-menu-button'>{isLoaded && sessionLinks}</div>
//             <button onClick={openMenu}>
//               <i className="fa-solid fa-bars"/>
//               <i className="fa-solid fa-user"/>
//             {showMenu && (
//               <ul className="menu-dropdown">
//                   {/* <div>
//                     <NavLink to="/login">
//                       <button>Log In</button>
//                     </NavLink>
//                   </div> */}
//                     {/* <NavLink to="signup">
//                       <butoon>Sign Up</butoon>
//                     </NavLink> */}
//                   <button onClick={() => history.push('/login')}>Log In</button>
//                   <br></br>
//                   <button onClick={() => history.push('/signup')}>Sign Up</button>
//                   {/* <button onClick={() => history.push('/current')}>My Spots</button>
//                   <button onClick={() => history.push('/currentReviews')}>My Reviews</button> */}
//               </ul>
//             )}
//             </button>
//       </div>
//   )
// }

//profile button

// import React, { useState, useEffect } from "react";
// import { useDispatch } from 'react-redux';
// import * as sessionActions from '../../store/session';
// import { NavLink, useHistory } from 'react-router-dom';

// function ProfileButton({ user }) {
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const [showMenu, setShowMenu] = useState(false);
  
//   const openMenu = () => {
//     if (showMenu) return;
//     setShowMenu(true);
//   };
  
//   useEffect(() => {
//     if (!showMenu) return;

//     const closeMenu = () => {
//       setShowMenu(false);
//     };

//     document.addEventListener('click', closeMenu);
  
//     return () => document.removeEventListener("click", closeMenu);
//   }, [showMenu]);

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.logout());
//   };

//   return (
//     <>
//       <button onClick={openMenu}>
//         <i className="fa-solid fa-bars"/>
//         <i className="fa-solid fa-user"/>
//       </button>
//       {showMenu && (
//         <ul className="profile-dropdown">
//           <li>Hello {user.username}!</li>
//           <li>{user.email}</li>
//           <br>
//             <button onClick={logout}>Log Out</button>
//           </br>
//           <br>
//           <button onClick={() => history.push('/current')}>My Spots</button>
//           </br>
//           <br>
//           <button onClick={() => history.push('/currentReviews')}>My Reviews</button>
//           </br>
//         </ul>
//       )}
//     </>
//   );
// }

// export default ProfileButton;