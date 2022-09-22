import { csrfFetch } from './csrf';

// TYPES
const CREATE_REVIEWS = 'reviews/CREATE_REVIEWS'
const READ__SPOT_REVIEWS = 'reviews/READ__SPOT_REVIEWS'
const READ_USER_REVIEWS = 'reviews/READ_USER_REVIEWS'
const DELETE_REVIEWS = 'reviews/DELETE_REVIEWS'

// ACTION CREATORS
export const createReview = (review) => ({
    type: CREATE_REVIEWS,
    payload: review
})

export const getSpotReviews = (reviews) => ({
    type: READ__SPOT_REVIEWS,
    payload: reviews
})

export const getUserReviews = (reviews) => ({
    type: READ_USER_REVIEWS,
    payload: reviews
})

export const deleteReview = (reviewId) => ({
    type: DELETE_REVIEWS,
    payload: reviewId
})

// THUNKS
export const createReviewThunk = (data, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(data)
  });
console.log('createReviewthunk', response)
  if(response.ok){
    const review = await response.json()
    dispatch(createReview(review))
    return review 
  }
}

export const getSpotReviewsThunk = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}/reviews`)

  if(response.ok){
    const reviews = await response.json()
    dispatch(getSpotReviews(reviews))
    return reviews
  }
}

export const getUserReviewsThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/reviews/current')

  if(response.ok){
    const reviews = await response.json()
    dispatch(getSpotReviews(reviews))
    return reviews
  }
}

export const DeleteReviewThunk = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
  });

  if(response.ok){
    const review = await response.json()
    dispatch(deleteReview(reviewId))
    return review
  } 
}

// reducers
const initialState = {spotReviews:{}, userReviews:{}}
export default function reviewsReducer(state=initialState, action){
  switch(action.type) {
    case CREATE_REVIEWS: {
      const newState = { ...state }
      newState[action.payload.id] = action.payload
      return newState
  }
    case READ__SPOT_REVIEWS: {
      const newState = { ...state, spotReviews:{...state.spotReviews} }
      newState.spotReviews = action.payload
      return newState;
    }
    case READ_USER_REVIEWS: {
    const newState = { ...state, userReviews:{...state.userReviews} }
      action.payload.userReviewsR.forEach(review => {
        newState.userReviews[review.id] = review
      });
      return newState;
    }
    case DELETE_REVIEWS: {
      const newState = { ...state }
      delete newState[action.anythingId]
      return newState
    }
    default:
      return state
  }
}
