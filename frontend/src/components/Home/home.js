// import React, {useState} from "react";
// import LoginForm from '../LoginFormModal';
// import SignupFormPage from "../SignupFormPage";
// import './home.css';

// export default function NavMenu() {
//     const [showMenu, setShowMenu] = useState(false);

//     return (
//         <>
//         <div className="nav-header">
//             {/* <img className="nav-header-icon"
//                  src=""
//                  alt=""
//             /> */}
//             <div className="nav-header-middle">
//                 <h1>Welcome to Staybnb</h1>
//             </div>
//             <div className="nav-header-right">
//                 <p>Become a host</p>
//             </div>
//             {/* <div className="nav-menu">
//                 {showMenu}
//                 <button onClick={() => setShowMenu(!showMenu)}></button>
//             </div> */}
//             <button id='nav-menu-button' onClick={() => setShowMenu()}>
//                 <div id='options'>
//                     <i className="fa-solid fa-bars"></i>
//                 </div>
//                 <div id='user-img'>
//                     <i className='fa-solid fa-user'></i>
//                 </div>
//             </button> 
//             {showMenu && (
//                 <div id='login-wrapper' onClick={() => setShowMenu(false)}>
//                     <LoginForm />
//                     <SignupFormPage />
//                 </div>
//             )}
//         </div>
//     </>
//     )
// }
