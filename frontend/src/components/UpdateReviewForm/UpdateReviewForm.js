import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams} from 'react-router-dom';
import { getOneReviewThunk, getSpotReviewsThunk, getUserReviewsThunk, updateReviewThunk } from '../../store/reviews';
import './UpdateReviewForm.css';

const UpdateReviewForm = () => {
    const { reviewId } = useParams();
    const currentReviews = useSelector(state => state.reviews.userReviews[reviewId]);
    const currentReviewId = currentReviews.id

    const history = useHistory();
    const dispatch = useDispatch();

    const [review, setReview] = useState(currentReviews?.review);
    const [stars, setStars] = useState(currentReviews?.stars);
    const [errors, setErrors] = useState([]);

    const updateReview = (e) => setReview(e.target.value);
    const updateStars = (e) => setStars(e.target.value);

useEffect(() => {
      dispatch(getUserReviewsThunk(reviewId));
    }, [dispatch, reviewId])

    if (!currentReviews) {
        return null;
    }

    const submitHandler = async (e) => {
    e.preventDefault();
    setErrors([]);

    let Review = {review, stars}

    if (Review.stars > 5 || Review.stars < 1) return setErrors(["Stars must be between 1 to 5"]);

    const payload = {
      review,
      stars
    };
  
  let updatedReview; 
  
  updatedReview = await dispatch(updateReviewThunk(payload));

  if (updatedReview) {
    history.push('/userReviews');
  }
}

const cancelHandler = (e) => {
    e.preventDefault();
    setErrors();
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
            onChange={updateReview} />
        <input
            className='UpdateReviewForm_Input'
            type="number"
            placeholder="Stars"
            value={stars}
            required
            min="1"
            max="5"
            onChange={updateStars} />
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
