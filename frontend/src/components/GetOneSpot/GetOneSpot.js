import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getOneSpotThunk } from '../../store/spots';
import  GetSpotReviews from "../../components/GetSpotReviews/GetSpotReviews";
import './GetOneSpot.css';

const GetOneSpot = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots.singleSpot);
  // const reviews = useSelector(state => state.reviews.spotReviews);
  console.log("spot", spot)
  
  useEffect(() => {
    dispatch(getOneSpotThunk(spotId))
  }, [dispatch, spotId]);
  
  if (Object.keys(spot).length === 0) {
    return null;
  }

  return (
    <>
      <div className="spot_wrapper">
          <div className="spot_header_info">
          <div className="spot_name">{spot.name}</div>
          <div className="spot_details">
            <div className="spot_rating">
              <i className="fa-solid fa-star"></i>
              {spot.avgStarRating} · {spot.numReviews ? spot.numReviews : 0} reviews · {spot.city}, {spot.state}, {spot.country}
            </div>
          </div>
        </div>
        </div>
        <div className='spot_image'>
              {spot.SpotImages.map((image) => {
              return <img src={image.url} alt=""></img>
              })} 
        </div>
        <div className="spot_details2">
              <div className="spot_host">Entire house hosted by {spot.Owner.firstName}</div>
              <div className="spot_description">{spot.description}</div>
        
        <div className="spot_border_box">
              <span className="border_box_left">${spot.price} night</span>
              <span className="border_box_right">
              <i className="fa-solid fa-star"></i>{spot.avgStarRating} {spot.numReviews} reviews</span>
        </div>
        <GetSpotReviews />
            <NavLink to={`/createReview/${spotId}`}>
              <button className="create-review-button">Create a Review</button>
            </NavLink>
    </div>
  </>
  );
};

export default GetOneSpot;