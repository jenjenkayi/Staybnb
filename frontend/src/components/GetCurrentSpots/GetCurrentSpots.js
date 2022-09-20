import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCurrentSpotsThunk } from '../../store/spots';
import './GetCurrentSpots.css';

const GetCurrentSpots = () => {
  const dispatch = useDispatch();
  const currentSpots = useSelector(state => state.spots.allSpots);
  const spotsArr = Object.values(currentSpots);

  console.log("currentSpots", currentSpots);
  console.log("spotsArr", spotsArr);

  useEffect(() => {
    dispatch(getCurrentSpotsThunk())
  }, [dispatch]);
  
 if (Object.keys(spotsArr).length === 0) {
    return null;
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
            </>
            )
         })}
      </div>
   </>
  );
};

export default GetCurrentSpots;