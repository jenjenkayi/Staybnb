import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createReviewThunk } from '../../store/reviews';
import './CreateReviewForm.css';

const CreateReviewForm = ({spotId}) => {
    // const { spotId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const userId = user.id

    // const reviews = useSelector(state => state.reviews.spotReviews);
    // const reviewsArr = Object.values(reviews);

    const currentSpot = useSelector(state => state.spots.singleSpot);
    const currentSpotId = currentSpot.id
    // const currentSpotsArr = Object.values(currentSpot);

    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');
    const [errors, setErrors] = useState([]);

    const updateReview = (e) => setReview(e.target.value);
    const updateStars = (e) => setStars(e.target.value);
    const updateErrors = (e) => setStars(e.target.value);

    const submitHandler = async () => {

    const payload = {
      userId: userId,
      spotId: currentSpotId,
      review,
      stars
    };
  
 // if (!) return setErrors("Please")

  let createdReview; 
  
  createdReview = await dispatch(createReviewThunk(payload));
  
  if (createdReview) {
    // history.push(`/spots/${spotId}`);
    history.push('/');
  }
}

  const cancelHandler = (e) => {
    e.preventDefault();
    // history.push(`/spots/${currentSpotId}`);
    history.push('/');
  };

  return (
    <section>
      <form className="create-review-form" onSubmit={submitHandler}>
        <div className='create-a-review'>Create A Review</div>
        <input
            type="text"
            placeholder='Write your review'
            value={review}
            required
            onChange={updateReview} />
        <input
            type="number"
            placeholder="Stars"
            value={stars}
            required
            min="1"
            max="5"
            onChange={updateStars} />
        <button type="submit">Submit</button>
        <button type="button" onClick={cancelHandler}>Cancel</button>
      </form>
    </section>
  );
}

export default CreateReviewForm;
