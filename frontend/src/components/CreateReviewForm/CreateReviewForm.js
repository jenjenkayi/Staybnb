import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createReviewThunk } from '../../store/reviews';
import './CreateReviewForm.css';

const CreateReviewForm = ({reviewId}) => {
    const { spotId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    
    const reviews = useSelector(state => state.reviews.spotReviews);

    const currentSpots = useSelector(state => state.spots.allSpots);
    const currentSpotsArr = Object.values(currentSpots);
    const currentSpot = currentSpotsArr.find(spot => spot.id === spotId)

    console.log("currentSpots", currentSpots)
    console.log("currentSpotsArr", currentSpotsArr)
    console.log("currentSpot", currentSpot)

    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');
    const [errors, setErrors] = useState([]);

    const updateReview = (e) => setReview(e.target.value);
    const updateStars = (e) => setStars(e.target.value);
    const updateErrors = (e) => setStars(e.target.value);

    const submitHandler = async (e) => {
    e.preventDefault();
    setErrors();

  const payload = {
      review,
      stars
    };
  
 // if (!) return setErrors("Please")

  let createdReview; 
  
  createdReview = await dispatch(createReviewThunk(payload));
  
  if (createdReview) {
    history.push(`/spots/${spotId}`);
    // history.push('/');
  }
}

  const cancelHandler = (e) => {
    e.preventDefault();
    history.push(`/spots/${spotId}`);
  };

  return (
    <section>
      <form className="create-review-form" onSubmit={submitHandler}>
        <h2>Create A Review</h2>
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
        <button type="submit">Create A Review</button>
        <button type="button" onClick={cancelHandler}>Cancel</button>
      </form>
    </section>
  );
}

export default CreateReviewForm;
