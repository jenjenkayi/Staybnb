import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotReviewsThunk } from '../../store/reviews';
import './GetSpotReviews.css';

const GetSpotReviews = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const reviews = useSelector(state => state.reviews.spotReviews);
  const reviewsArr = Object.values(reviews);
  
  useEffect(() => {
    dispatch(getSpotReviewsThunk(spotId))
  }, [dispatch, spotId]);

   if (Object.keys(reviewsArr).length === 0) {
    return null;
  }

  return (
    <>
      <div className="reviews_cards_container">
           <div className="reviews_headers">
            {reviewsArr.length} Reviews
            {/* <i className="fa-solid fa-star"></i>
            {reviewsArr.stars} */}
        </div>
            <br></br>
        {reviewsArr && reviewsArr.map((review) => {
          return (
            <div className="review_details">
              <div className="review_creator">{review.User.firstName}</div>
              <div className="review_date">{review.createdAt.slice(0, 10)}</div>
              <div className="review_rating">
                <i className="fa-solid fa-star"></i>
                {review.stars}
              </div>
              <div className="review_description">{review.review}</div>
              </div>
            )
        })}
      </div>
  </>
  );
};

export default GetSpotReviews;


