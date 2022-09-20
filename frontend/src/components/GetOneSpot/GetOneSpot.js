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
        {spotArr && spotArr.map((spot) => {
          return (
            <><div className="spot_name">{spot.name}</div>
            <div className="spot_rating">
              <i className="fa-solid fa-star"></i>
              {spot.avgStarRating} · {spot.numReviews} reviews · {spot.city}, {spot.state}, {spot.country} ${spot.price} night
            </div>
            <div className='spot_image'>
             <img src={spot.SpotImages[0].url} alt=""></img>
            </div>
            <div className="spot_description">{spot.description}</div>
            <div className="border_box">
              <span className="border_box_left">${spot.price} night</span>
              <span className="border_box_right">
              <i className="fa-solid fa-star"></i>{spot.avgStarRating} {spot.numReviews} reviews</span>
              </div>
              </>
          )
               })}
      </div>
  </>
  );
};

export default GetOneSpot;