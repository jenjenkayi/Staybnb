import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserReviewsThunk, deleteReviewThunk } from '../../store/reviews';
import './GetUserReviews.css';

const GetUserReviews = () => {
  const { reviewId } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);

  const reviews = useSelector(state => state.reviews.userReviews);
  const reviewsArr = Object.values(reviews);

  console.log('reviews', reviews)
  console.log('reviewarr', reviewsArr)
  console.log("user", user)
  
  useEffect(() => {
    dispatch(getUserReviewsThunk())
  }, [dispatch]);

   if (Object.keys(reviewsArr).length === 0) {
    return null;
  }

  //  const deleteHandler = async (reviewId) => {
  //     await dispatch(deleteReviewThunk(reviewId));
  //     // history.push("/currentSpots");
  // }

  return (
       <h2>Hello</h2>
  //   <>
  //     <div className="reviews_cards_container">
  //          <div className="reviews_headers">
  //           {reviewsArr.length} Review
  //           {/* <i className="fa-solid fa-star"></i>
  //           {reviewsArr.stars} */}
  //       </div>
  //           <br></br>
  //       {reviewsArr && reviewsArr.map((review) => {
  //         return (
  //           <><div className="review_details">
  //             <div className="review_creator">{review.User.firstName}</div>
  //             <div className="review_date">{review.createdAt}</div>
  //             <div className="review_rating">
  //               <i className="fa-solid fa-star"></i>
  //               {review.stars}
  //             </div>
  //             <div className="review_description">{review.review}</div>
  //             </div>
  //              {user && <button onClick={()=>deleteHandler(review.id)}>Delete Review</button>}
  //             </>
  //             )
  //       })}
  //     </div>
  // </>
  );

};

export default GetUserReviews;