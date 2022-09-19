import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getAllSpotsThunk } from '../../store/spots';
import CreateSpotForm from '../CreateSpotForm/CreateSpotForm'
import  GetSpotById from '../GetSpotById/GetSpotById';
import './GetAllSpots.css';

const GetAllSpots = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots);
  const spotsArr = Object.values(spots);
  console.log('spots', spots)
  console.log('arr', spotsArr[0])

  useEffect(() => {
    dispatch(getAllSpotsThunk())
  }, [dispatch]);

  if (!spotsArr) {
    return null;
  }

  return (
    <>
    <h2>Spots</h2>
      <div className="spots_cards_container">
        {spotsArr[0] && spotsArr[0].map((spot) => {
          return (
            <NavLink key={spot.id} to={`/spots/${spot.id}`}>
              <img className='spot_img'
              src={spot.previewImage}
              alt=""
              />
              <div className="spot_location">{spot.city}, {spot.state}</div>
              <div className="spot_price">${spot.price} night</div>
              <div className="spot_rating">
                <i className="fa-solid fa-star"></i>
                {spot.avgRating}
              </div>
            </NavLink>
                )
               })}
      </div>
  </>
  );
};

export default GetAllSpots;
