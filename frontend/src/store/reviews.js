
// TYPES
const CREATE = 'reviews/create'
const READ = 'reviews/READ'
const UPDATE = 'reviews/UPDATE'
const DELETE = 'reviews/DELETE'

// ACTION CREATORS
export const createReview = (review) => ({
    type: CREATE,
    payload: review
})

export const getAllReviews = (reviews) => ({
    type: READ,
    payload: reviews
})

export const deleteReview = (review) => ({
    type: DELETE,
    payload: review
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
    const response = await fetch('/api/review', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(imageUrl)
  });
    dispatch(createReview(review))
    return review
  } else {
    return response
  }
}

export const getAllReviewsThunk = () => async (dispatch) => {
  const response = await fetch('/api/reviews')

  if(response.ok){
    const reviews = await response.json()
    dispatch(getAllReviews(reviews))
    return reviews
  } else {
    return response
  }
}

export const DeleteReviewThunk = (ReviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${ReviewId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ReviewId)
  });

  if(response.ok){
    const review = await response.json()
    dispatch(deleteReview(ReviewId))
    return review
  } else {
    return response
  }
}

// reducers
export default function ReviewsReducer(state, action){
  const newState = { ...state }
  switch(action.type){
    case READ:
      const normalize = {}
      action.payload.allReviews.forEach(review => {
        normalize[review.id] = review
      });
      return
    case CREATE:
      newState[action.payload.id] = action.payload
      return newState
    case UPDATE:
      newState[action.payload.id] = { ...state[action.payload.id], ...action.payload }
      return newState
    case DELETE:
      delete newState[action.anythingId]
      return newState
    default:
      return state
  }
}
