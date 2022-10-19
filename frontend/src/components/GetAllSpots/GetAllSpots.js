import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllSpotsThunk } from '../../store/spots';
import './GetAllSpots.css';

const GetAllSpots = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots.allSpots);
  const spotsArr = Object.values(spots);

  useEffect(() => {
    dispatch(getAllSpotsThunk())
  }, [dispatch]);

   if (Object.keys(spotsArr).length === 0) {
    return null;
  }

  return (
    spotsArr && (
    <div className="spots_cards_container">
        {spotsArr && spotsArr.map((spot) => {
          return (
             <NavLink key={spot.id} to={`/spots/${spot.id}`}>
              <img 
              className="spots_img"
              src={spot.previewImage}
              alt=""
              />
              <div className='spots_details_container1'>
                <div className="spots_location">{spot.city},  {spot.state}</div> 
                <div className="spots_rating">
                  <i id="rating" className="fa-solid fa-star"></i>
                  <span>
                  {parseFloat(spot.avgRating) ? spot.avgRating : "New"}
                  </span>
                </div>
              </div>
              <div className="spots_name">{spot.name}</div>
              <div className='spots_details_container2'>
                <div id="price" className="spots_price">${spot.price}</div>
                <span> night</span>
              </div>
                </NavLink>
          )
        })}
    </div>
    )
  );
};

export default GetAllSpots;
