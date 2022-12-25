import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams} from 'react-router-dom';
import { getUserReviewsThunk, updateReviewThunk } from '../../store/reviews';
import './UpdateReviewForm.css';

const UpdateReviewForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
    const { reviewId } = useParams();

    const currentReview = useSelector(state => state.reviews.userReviews[reviewId]);
    const currentReviewId = currentReview.id

    const [review, setReview] = useState(currentReview?.review);
    const [stars, setStars] = useState(currentReview?.stars);
    const [errors, setErrors] = useState([]);

useEffect(() => {
      dispatch(getUserReviewsThunk(currentReviewId));
    }, [dispatch, currentReviewId])

    const submitHandler = async (e) => {
    e.preventDefault();
    setErrors([]);


    let Review = {review, stars}

    if (Review.review.length < 10) return setErrors(["Review must be 10 or more characters"]);
    if (Review.stars > 5 || Review.stars < 1) return setErrors(["Stars must be between 1 to 5"]);

    const payload = {
      reviewId: currentReviewId,
      review,
      stars
    };
  
  dispatch(updateReviewThunk(payload)).then(() => {
    history.push('/userReviews');
  dispatch(getUserReviewsThunk())
  })
}

const cancelHandler = (e) => {
    e.preventDefault();
    history.push('/userReviews');
};

return (
    <section className="UpdateReviewForm_Container">
      <form  onSubmit={submitHandler}>
        <h3 className="UpdateReviewForm_Title">Edit A Review</h3>
        <ul className="errors">
          {errors.length > 0 &&
          errors.map((error) => <li key={error}>{error}</li>)}
        </ul>
        <input
            className='UpdateReviewForm_Input'
            type="text"
            placeholder='Write your review'
            value={review}
            required
            onChange={(e) => setReview(e.target.value)} />
        <input
            className='UpdateReviewForm_Input'
            type="number"
            placeholder="Stars"
            value={stars}
            required
            min="1"
            max="5"
            onChange={(e) => setStars(e.target.value)} />
        <button type="submit" className='UpdateReviewForm_Submit_Button'>Submit</button>
        <button type="button" 
        onClick={cancelHandler}
         className='UpdateReviewForm_Cancel_Button'
        >
        Cancel
        </button>
      </form>
    </section>
  );
}

export default UpdateReviewForm;
