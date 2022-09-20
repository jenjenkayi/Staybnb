import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSpotThunk } from '../../store/spots';
import './GetOneSpot.css';

const GetOneSpot = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots);
  const spotArr = Object.values(spot);

  useEffect(() => {
    dispatch(getOneSpotThunk(spotId))
  }, [dispatch, spotId]);
  
  if (!spotArr) {
    return null;
  }

  return (
    <>
      <div className="spot_cards_container">
        <br></br>
        {spotArr && spotArr.map((spot) => {
          return (
            <><div className="spot_name">{spot.name}</div>
            <div className="spot_rating">
              <i className="fa-solid fa-star"></i>
              {spot.avgStarRating} · {spot.numReviews} reviews · {spot.city}, {spot.state}, {spot.country} ${spot.price} night
            </div>
             <img className='spot_img'
              src={spot.SpotImages[0].url}
              alt=""
              />
            <div className="spot_description">{spot.description}</div>
              </>
          )
               })}
      </div>
  </>
  );
};

export default GetOneSpot;