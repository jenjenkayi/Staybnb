import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getCurrentSpotsThunk, deleteSpotThunk} from '../../store/spots';
import './GetCurrentSpots.css';

const GetCurrentSpots = () => {  
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const currentSpots = useSelector(state => state.spots.singleSpot);
  const spotsArr = Object.values(currentSpots);
  const userSpots = spotsArr.filter((spot) => spot.ownerId === user.id);

  useEffect(() => {
    dispatch(getCurrentSpotsThunk())
  }, [dispatch]);

  // if (userSpots.length === 0) {
  //   return <div className="curr_spot_no_spots">
  //     There are no listings yet.
  //   </div>;
  // }

  const deleteHandler = async (spotId) => {
      await dispatch(deleteSpotThunk(spotId));
      history.push("/");
  }


return (
  <>
    <div className='curr_spot_title'>Listings</div>
      <div className="curr_spot_cards_container">
        {!userSpots.length && <div className="curr_spot_no_spots">There is no listing yet.</div>}
         {userSpots && userSpots.map((spot) => {
          return (
            <>
            <div className='curr_spot_details_outer_container'>
                <NavLink key={spot.id} to={`/spots/${spot.id}`}>
                <img className='curr_spot_image' src={spot.previewImage} alt=""></img>
                </NavLink>
                <div className='curr_spot_details_container1'>
                  <div className="curr_spot_location">{spot.city},  {spot.state}</div> 
                  <div className="curr_spot_rating">
                      <i id="curr_rating" className="fa-solid fa-star"></i>
                      <span>
                      {spot.avgRating? spot.avgRating : 0} 
                      </span>
                  </div>
                </div>
                <div className="curr_spot_name">{spot.name}</div>
                <div className='curr_spot_details_container2'>
                    <div id="price" className="spots_price">${spot.price}</div>
                    <span> night</span>
                </div>
                <div className="curr_spot_buttons">
                {/* <button onClick={() => history.push(`/updateSpot/${spot.id}`)}>Edit Spot</button> */}
                <NavLink to={`/updateSpot/${spot.id}`}>
                  <button className="curr_spot_edit_button">Edit Spot</button>
                </NavLink>
                  <button className="curr_spot_delete_button" onClick={() => deleteHandler(spot.id)}>Delete Spot</button>
                </div>
          </div>     
            </>
            )
         })}
      </div>
   </>
  );
};

export default GetCurrentSpots;