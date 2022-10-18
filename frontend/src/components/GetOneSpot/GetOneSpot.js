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

  const reviews = useSelector(state => state.reviews.spotReviews);
  const userReview = Object.values(reviews).filter((review) => review.userId === user?.id)

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
              {spot.avgStarRating ? spot.avgStarRating : 0} · {spot.numReviews ? spot.numReviews : 0} reviews · {spot.city}, {spot.state}, {spot.country}
            </div>
          </div>
        </div>

      <div className='one_spot_image'>
             {spot?.SpotImages?.map((image) => {
                return <img className="one_spot_img "src={image.url} alt=""/>
              })} 
      </div>

      <div className="one_spot_details_container">
        <div className="one_spot_details2">
              <div className="one_spot_host">Entire house hosted by {spot?.Owner?.firstName}</div>
              <div className="one_spot_description">{spot.description}</div>

        <div className="one_spot_details3">
          <div className="one_spot_check_in">
          <i className="fa-solid fa-door-closed"></i>
          Self check-in
          </div>
          <div className="one_spot_location">
          <i className="fa-solid fa-location-dot fa-lg"></i> 
          Great location
          </div>
          <div className="one_spot_cancellation">
          <i className="fa-solid fa-calendar"></i> 
          Free cancellation for 48 hours
          </div>
        </div>

        <div className="one_spot_details4">
          <div className='one_spot_details4_title'>
          What this place offers
          </div>
          <div className='one_spot_details4_offers'>
            <div className='one_spot_details4_offers1'>
              <div className="one_spot_kitchen">
                <i className="fa-solid fa-utensils"></i>
                Kitchen
              </div>
              <div className="one_spot_parking">
                <i className="fa-solid fa-car"></i>
                Free parking 
              </div>
              <div className="one_spot_wifi">
                <i className="fa-solid fa-wifi"></i>
                Wifi
              </div>
              <div className="one_spot_linens">
                <i className="fa-solid fa-mattress-pillow"></i>
                Bed linens
              </div>
              </div>
            
            <div className='one_spot_details4_offers2'>
              <div className="one_spot_tv">
                <i className="fa-solid fa-tv"></i>
                TV
              </div>
              <div className="one_spot_ac">
                <i className="fa-solid fa-snowflake fa-lg"></i>
                Central air conditioning
              </div>
              <div className="one_spot_bath">
                <i className="fa-solid fa-bath"></i>
                Private hot tub
              </div>
              <div className="one_spot_heating">
               <i className="fa-solid fa-temperature-three-quarters fa-xl"></i>
                Heating
              </div>
            </div>
          </div>
        </div>
      </div>

        <div className="one_spot_border_box">
              <div className="border_box_left">${spot.price} night</div>
              <div className="border_box_right">
                <i className="fa-solid fa-star"></i>
                {spot.avgStarRating? spot.avgStarRating : 0} · {spot.numReviews? spot.numReviews : 0} reviews
              </div>        
        </div>
        </div>
       
        <div>
            <GetSpotReviews />
            {!userReview.length && user && <NavLink to={`/createReview/${spotId}`}>
            <button 
              type="submit"
              className="one_spot_create_review_button"
              >Create a Review
            </button>
            </NavLink>}
        </div>
  </div>
  </>
  );
};

export default GetOneSpot;