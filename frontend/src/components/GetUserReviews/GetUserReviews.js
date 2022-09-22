import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getUserReviewsThunk } from '../../store/reviews';
import './GetUserReviews.css';

const GetUserReviews = () => {
 const dispatch = useDispatch();
  const { spotId } = useParams();

  const reviews = useSelector(state => state.reviews.spotReviews);
  const reviewsArr = Object.values(reviews.Reviews);

  console.log('review', reviews)
  console.log('reviewarr', reviewsArr)

  useEffect(() => {
    dispatch(getUserReviewsThunk(spotId))
  }, [dispatch, spotId]);

   if (Object.keys(reviewsArr).length === 0) {
    return null;
  }

  return (
    <>
      <div className="reviews_cards_container">
           <div className="reviews_headers">
            {reviewsArr.length} Review
            {/* <i className="fa-solid fa-star"></i>
            {reviewsArr.stars} */}
        </div>
            <br></br>
        {reviewsArr && reviewsArr.map((review) => {
          return (
            // <NavLink key={review.id} to={`/review/${review.id}`}>
            <div className="review_details">
              <div className="review_creator">Review By: {review.User.firstName}</div>
              <div className="review_date">{review.createdAt}</div>
              <div className="review_rating">
                <i className="fa-solid fa-star"></i>
                {review.stars}
              </div>
              <div className="review_description">{review.review}</div>
              </div>
            // </NavLink>
                )
        })}
      </div>
  </>
  );

};

export default GetUserReviews;