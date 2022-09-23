import React, { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getOneSpotThunk } from '../../store/spots';
import  GetSpotReviews from "../../components/GetSpotReviews/GetSpotReviews";
import CreateReviewForm from "../CreateReviewForm/CreateReviewForm";
import './GetOneSpot.css';

const GetOneSpot = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots.singleSpot);
  const reviews = useSelector(state => state.reviews.spotReviews);
  // console.log("reviews", reviews)

  useEffect(() => {
    dispatch(getOneSpotThunk(spotId))
  }, [dispatch, spotId, reviews]);
  
  if (Object.keys(spot).length === 0) {
    return null;
  }

  return (
     <section>
      <div className="spot_cards_container">
            <><div className="spot_name">{spot.name}</div>
            <div className="spot_rating">
              <i className="fa-solid fa-star"></i>
              {spot.avgStarRating} · {spot.numReviews} reviews · {spot.city}, {spot.state}, {spot.country} ${spot.price} night
            </div>
            <div className='spot_image'>
              {spot.SpotImages.map((image) => {
              return <img src={image.url} alt=""></img>
              })} 
              {/* <img src={spot.previewImage} alt=""></img> */}
            </div>
            {/* <div className="spot_owner">{spot.Owner.firstName}</div> */}
            <div className="spot_details">Host by {spot.owner}</div>
              <div className="spot_description">{spot.description}</div>
              <div className="border_box">
              <span className="border_box_left">${spot.price} night</span>
              <span className="border_box_right">
              <i className="fa-solid fa-star"></i>{spot.avgStarRating} {spot.numReviews} reviews</span>
            </div>
            <GetSpotReviews />
            <NavLink to={'/createReview'}>
              <button className="create-review-button">Create a Review</button>
            </NavLink>
            <CreateReviewForm />
            </>
      </div>
   </section>
  );
};

export default GetOneSpot;