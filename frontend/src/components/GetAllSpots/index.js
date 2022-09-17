import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  NavLink } from 'react-router-dom';
import { CreateSpotForm }from './CreateSpotForm';
import { getAllSpotsThunk } from '../store/spot';

const getAllSpots = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots);

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  if (!spots) {
    return null;
  }
  return (
    <div className='get-all-spots'>Get All Spots</div>
  )
//     <main>
//       <nav>
//         <div hidden={spotList} onClick={() => setSpotList(true)} />
//         {spots.map((spot) => {
//           return (
//             <NavLink key={spot.name} to={`/spot/${spot.id}`}>
//               <div
//                 className={
//                   Number.parseInt(spotId) === spot.id
//                     ? "nav-entry is-selected"
//                     : "nav-entry"
//                 }
//               >
//                 <div
//                   className="nav-entry-image"
//                   style={{ backgroundImage: `url('${spot.imageUrl}')` }}
//                 ></div>
//                 <div>
//                   <div className="primary-text">{spot.name}</div>
//                   <div className="secondary-text">
//                     {spot.number} {spot.captured && "(Captured)"}
//                   </div>
//                 </div>
//               </div>
//             </NavLink>
//           );
//         })}
//       </nav>
//       {spotList ? (
//         <CreateSpotForm hideForm={() => setSpotList(false)} />
//       ) : (
//         <Route path="/spot/:spotId">
//           <GetSpotById />
//         </Route>
//       )}
//     </main>
//   );
};

export default getAllSpots;
