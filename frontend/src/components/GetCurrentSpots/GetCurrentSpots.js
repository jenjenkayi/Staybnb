import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, NavLink, useHistory } from "react-router-dom";
import { getCurrentSpotsThunk, deleteSpotThunk } from '../../store/spots';
import './GetCurrentSpots.css';

const GetCurrentSpots = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const currentSpots = useSelector(state => state.spots.allSpots);
  const spotsArr = Object.values(currentSpots);
  const history = useHistory();

  useEffect(() => {
    dispatch(getCurrentSpotsThunk())
  }, [dispatch]);
  
 if (Object.keys(spotsArr).length === 0) {
    return null;
  }

  const deleteHandler = async (spotId) => {
      await dispatch(deleteSpotThunk(spotId));
      // history.push("/currentSpots");
  }

  return (
     <>
      <div className="spot_cards_container">
         {spotsArr && spotsArr.map((spot) => {
          return (
            <><div className="spot_name">{spot.name}</div>
            <div className="spot_rating">
              <i className="fa-solid fa-star"></i>
              {spot.avgStarRating} · {spot.numReviews} reviews · {spot.city}, {spot.state}, {spot.country} ${spot.price} night
            </div>
            <div className='spot_image'>
              <img src={spot.previewImage} alt=""></img>
            </div>
            <div className="spot_description">{spot.description}</div>
             {/* <button onClick={() => history.push(`/updateSpot/${spot.id}`)}>Edit Spot</button> */}
             <NavLink to={`/updateSpot/${spot.id}`}>
              <button className="edit-button">Edit Spot</button>
             </NavLink>
              <button onClick={()=>deleteHandler(spot.id)}>Delete Spot</button>
            </>
            )
         })}
      </div>
   </>
  );
};

export default GetCurrentSpots;