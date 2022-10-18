import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getUserReviewsThunk, deleteReviewThunk } from '../../store/reviews';
import './GetUserReviews.css';

const GetUserReviews = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const reviews = useSelector(state => state.reviews.userReviews);
  const reviewsArr = Object.values(reviews);
  const userReviews = reviewsArr.filter((review) => review.userId === user.id);

  useEffect(() => {
    dispatch(getUserReviewsThunk())
  }, [dispatch]);

  if (userReviews.length === 0) {
    return <div className='UserReviews_no_review'>
      There are no reviews yet.
    </div>;
  }

  const deleteHandler = async (reviewId) => {
      await dispatch(deleteReviewThunk(reviewId));
      history.push("/");
  }

  return (
    <>
        <div className="UserReviews_Header">Reviews</div>
      <div className="UserReviews_Container">
            {userReviews && userReviews.map((review) => {
                return (
                  <>
                  <div className="UserReviews_Details">
                  <div className="UserReviews_Location">Location: {review?.Spot?.name}</div>
                  <div className="UserReviews_Creator">Review by: {review?.User?.firstName}</div>
                  <div className="UserReviews_Rating">
                    <i className="fa-solid fa-star"></i>
                    {review.stars}
                  </div>
                  <div className="UserReviews_Description">{review.review}</div>
                  {user && <button className="UserReviews_Delete_Button"
                  onClick={()=>deleteHandler(review.id)}>Delete Review
                  </button>}
                  {/* <NavLink to={`/updateReview/${review.id}`}>
                  <button className="UserReviews_Edit_Button">Edit Review</button>
                  </NavLink> */}
                  </div>
                  </>
                )
              })}
      </div>
  </>
  );

};

export default GetUserReviews;