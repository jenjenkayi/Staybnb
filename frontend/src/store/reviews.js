import { csrfFetch } from './csrf';

// TYPES
const CREATE_REVIEW = 'reviews/CREATE_REVIEW'
const READ_SPOT_REVIEWS = 'reviews/READ_SPOT_REVIEWS'
const READ_USER_REVIEWS = 'reviews/READ_USER_REVIEWS'
const DELETE_REVIEWS = 'reviews/DELETE_REVIEWS'

// ACTION CREATORS
export const createReview = (review) => ({
    type: CREATE_REVIEW,
    payload: review
})

export const getSpotReviews = (reviews) => ({
    type: READ_SPOT_REVIEWS,
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
  const response = await csrfFetch(`/api/spots/${data.spotId}/reviews`, {
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

  if(response.ok){
    const review = await response.json()
    dispatch(createReview(review))
    return response
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
    dispatch(getUserReviews(reviews))
    return reviews
  }
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
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
    case CREATE_REVIEW: {
      // const newState = { ...state, spotReviews:{...state.spotReviews}}
      // console.log("newState", newState)
      // newState.spotReviews[action.payload.id] = action.payload
      // return newState
      // const newState = {...state}
      // newState[action.payload.id] = {...newState[action.payload.id], ...action.payload}
      // console.log("newState", newState)
      // return newState;
       const newState = {...state}
      newState[action.payload.id] = action.payload
      return newState;
  }
    case READ_SPOT_REVIEWS: {
      const newState = { ...state, spotReviews:{}}
       action.payload.Reviews.forEach(review => {
        newState.spotReviews[review.id] = review
        console.log("newState", newState)
       })
      return newState;
    }
    case READ_USER_REVIEWS: {
    const newState = { ...state, userReviews:{...state.userReviews}}
      action.payload.Reviews.forEach(review => {
        newState.userReviews[review.id] = review
      });
      return newState;
    }
    case DELETE_REVIEWS: {
      const newState = { ...state, spotReviews:{...state.spotReviews}}
      delete newState.spotReviews[action.payload]
      return newState
    }
    default:
      return state
  }
}
