
// TYPES
const CREATE_REVIEWS = 'reviews/CREATE_REVIEWS'
const READ_REVIEWS = 'reviews/READ_REVIEWS'
const READ_CURRENT_REVIEWS = 'reviews/READ_CURRENT_REVIEWS'
const DELETE_REVIEWS = 'reviews/DELETE_REVIEWS'

// ACTION CREATORS
export const createReview = (review) => ({
    type: CREATE_REVIEWS,
    payload: review
})

export const getAllReviews = (reviews) => ({
    type: READ_REVIEWS,
    payload: reviews
})

export const getCurrentReviews = (reviews) => ({
    type: READ_CURRENT_REVIEWS,
    payload: reviews
})

export const deleteReview = (reviewId) => ({
    type: DELETE_REVIEWS,
    payload: reviewId
})

// THUNKS
export const createReviewThunk = (data) => async (dispatch) => {
  const response = await fetch('/api/reviews', {
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(data)
  });

  if(response.ok){
    const review = await response.json()
    dispatch(createReview(review))
    return review 
  }
}

export const getAllReviewsThunk = () => async (dispatch) => {
  const response = await fetch('/api/reviews')

  if(response.ok){
    const reviews = await response.json()
    dispatch(getAllReviews(reviews))
    return reviews
  }
}

export const getCurrentReviewsThunk = () => async (dispatch) => {
  const response = await fetch('/api/reviews/current')

  if(response.ok){
    const reviews = await response.json()
    dispatch(getAllReviews(reviews))
    return reviews
  }
}

export const DeleteReviewThunk = (reviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
  });

  if(response.ok){
    const review = await response.json()
    dispatch(deleteReview(reviewId))
    return review
  } 
}

// reducers
const initialState = {}
export default function reviewsReducer(state=initialState, action){
  const newState = { ...state }
  switch(action.type) {
    case CREATE_REVIEWS: {
      newState[action.payload.id] = action.payload
      return newState
  }
    case READ_REVIEWS: {
      const normalize = {}
      action.payload.allReviews.forEach(review => {
        normalize[review.id] = review
      });
      return newState;
    }
    case READ_CURRENT_REVIEWS: {
      const normalize = {}
      action.payload.allReviews.forEach(review => {
        normalize[review.id] = review
      });
      return newState;
    }
    case DELETE_REVIEWS: {
      delete newState[action.anythingId]
      return newState
    }
    default:
      return state
  }
}
