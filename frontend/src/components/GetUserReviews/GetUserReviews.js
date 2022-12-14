import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { getUserReviewsThunk, deleteReviewThunk } from '../../store/reviews';
import './GetUserReviews.css';

const GetUserReviews = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const reviews = useSelector(state => state.reviews.userReviews);
  const reviewsArr = Object.values(reviews);
  const userReviews = reviewsArr.filter((review) => review.userId === user.id);

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(getUserReviewsThunk())
    .then(() => setIsLoaded(true))
  }, [dispatch]);

  const deleteHandler = async (reviewId) => {
    if (window.confirm("Are you sure you want delete this review?")) {
      await dispatch(deleteReviewThunk(reviewId));
    }
      history.push("/userReviews");
  }

  return (
    <>
        <div className="UserReviews_Header">My Reviews</div>
      <div className="UserReviews_Container">
            {isLoaded && !userReviews.length && <div className="UserReviews_no_review">There is no review yet.</div>}
            {isLoaded && userReviews && userReviews.map((review) => {
                return (
                  <>
                {isLoaded && (
                  <div className="UserReviews_Details">
                  <div className="UserReviews_Location">Location: {review?.Spot?.name}</div>
                  <div className="UserReviews_Creator">Review by: {review?.User?.firstName}</div>
                  <div className="UserReviews_Rating">
                    <i className="fa-solid fa-star"></i>
                    {review.stars}
                  </div>
                  <div className="UserReviews_Description">{review.review}</div>
                  <NavLink to={`/updateReview/${review.id}`}>
                  <button className="UserReviews_Edit_Button">Edit Review</button>
                  </NavLink>
                  {user && <button className="UserReviews_Delete_Button"
                  onClick={()=>deleteHandler(review.id)}>Delete Review
                  </button>}
                  </div>
                )}
                  </>
                )
              })}
      </div>
  </>
  );

};

export default GetUserReviews;