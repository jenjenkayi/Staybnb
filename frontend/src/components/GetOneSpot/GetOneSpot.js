import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getOneSpotThunk } from '../../store/spots';
import  GetSpotReviews from "../../components/GetSpotReviews/GetSpotReviews";
import './GetOneSpot.css';

const GetOneSpot = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const user = useSelector((state) => state.session.user)
  const spot = useSelector(state => state.spots.singleSpot);

  useEffect(() => {
    dispatch(getOneSpotThunk(spotId))
  }, [dispatch, spotId]);
  
  if (Object.keys(spot).length === 0) {
    return null;
  }

  return (
    <>
    <div className="one_spot_wrapper">
        <div className="one_spot_header_info">
          <div className="one_spot_name">{spot.name}</div>
          <div className="one_spot_details">
            <div className="one_spot_rating">
              <i className="fa-solid fa-star"></i>
              {spot.avgStarRating ? spot.avgStarRating : "0"} · {spot.numReviews ? spot.numReviews : '0'} reviews · {spot.city}, {spot.state}, {spot.country}
            </div>
          </div>
        </div>
      <div className='one_spot_image'>
              {spot.SpotImages.map((image) => {
                return <img className="one_spot_img "src={image.url} alt=""/>
              })} 
      </div>
      <div className="one_spot_details_container">
        <div className="one_spot_details2">
              <div className="one_spot_host">Entire house hosted by {spot.Owner.firstName}</div>
              <div className="one_spot_description">{spot.description}</div>
        </div>
        <div className="one_spot_border_box">
              <div className="border_box_left">${spot.price} night</div>
              <div className="border_box_right">
                <i className="fa-solid fa-star"></i>
                {spot.avgStarRating? spot.avgStarRating : 0} · {spot.numReviews? spot.numReviews : 0} reviews
              </div>        
        </div>
        </div>
          <GetSpotReviews />
            {user && <NavLink to={`/createReview/${spotId}`}>
            <button className="one_spot_create_review_button">Create a Review
            </button>
            </NavLink>}
    </div>
  </>
  );
};

export default GetOneSpot;