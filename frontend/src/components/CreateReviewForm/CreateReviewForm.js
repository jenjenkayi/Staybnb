import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createReviewThunk } from '../../store/reviews';
import './CreateReviewForm.css';

const CreateReviewForm = () => {
    const { spotId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const currentSpot = useSelector(state => state.spots.singleSpot);
    const userId = user.id
    const currentSpotId = currentSpot.id

    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');
    const [errors, setErrors] = useState([]);

    const updateReview = (e) => setReview(e.target.value);
    const updateStars = (e) => setStars(e.target.value);

    const submitHandler = async (e) => {
      e.preventDefault();
      setErrors([]);  

      let Review = {review, stars}

      if (!Review.review.length || Review.review.length < 10) return setErrors(["Please provide a review and it must be 10 or more characters"]);
      if (!Review.stars.length) return setErrors(["Please provide a star"]);
      if (Review.stars > 5 || Review.stars < 1) return setErrors(["Stars must be between 1 to 5"]);

    const payload = {
      userId: userId,
      spotId: currentSpotId,
      review,
      stars
    };
  
  let createdReview; 
  
  createdReview = await dispatch(createReviewThunk(payload));

  if (createdReview) {
    history.push(`/spots/${spotId}`);
    // history.push('/');
  }
}

  const cancelHandler = (e) => {
    e.preventDefault();
    // history.push(`/spots/${currentSpotId}`);
    history.push(`/spots/${spotId}`);
  };

  return (
    <section>
      <form className="CreateReviewForm_Container" onSubmit={submitHandler}>
        <h3 className="CreateReviewForm_Title">Create A Review</h3>
        <ul className="errors">
          {errors.length > 0 &&
          errors.map((error) => <li key={error}>{error}</li>)}
        </ul>
        <input
            className='CreateReviewForm_Input'
            type="text"
            placeholder='Write your review'
            value={review}
            // required
            onChange={updateReview} />
        <input
            className='CreateReviewForm_Input'
            type="number"
            placeholder="Stars"
            value={stars}
            // required
            // min="1"
            // max="5"
            onChange={updateStars} />
        <button type="submit" className='CreateReviewForm_Submit_Button'>Submit</button>
        <button type="button" 
        onClick={cancelHandler}
         className='CreateReviewForm_Cancel_Button'
        >
        Cancel
        </button>
      </form>
    </section>
  );
}

export default CreateReviewForm;
