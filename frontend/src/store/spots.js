

// TYPES
const CREATE = 'spots/create'
const READ = 'spots/READ'
const UPDATE = 'spots/UPDATE'
const DELETE = 'spots/DELETE'

// ACTION CREATORS
export const createSpot = (spot) => ({
    type: CREATE,
    payload: spot
})

export const getAllSpots = (spots) => ({
    type: READ,
    payload: spots
})

export const updateSpot = (spot) => ({
    type: UPDATE,
    payload: spot
})

export const deleteSpot = (spot) => ({
    type: DELETE,
    payload: spot
})

// THUNKS
export const createSpotThunk = (data) => async (dispatch) => {
  const response = await fetch('/api/spots', {
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(data)
  });

  if(response.ok){
    const spot = await response.json()
    dispatch(createSpot(spot))
    return spot
  } 
}

export const getAllSpotsThunk = () => async (dispatch) => {
  const response = await fetch('/api/spots')

  if(response.ok){
    const spots = await response.json()
    dispatch(getAllSpots(spots))
    return spots
  } else {
    return response
  }
}

export const updateSpotThunk = (spot) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spot.id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(spot)
  });

  if(response.ok){
    const spot = await response.json()
    dispatch(createSpot(spot))
    return spot
  } else {
    return response
  }
}

export const DeleteSpotThunk = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(spotId)
  });

  if(response.ok){
    const spot = await response.json()
    dispatch(deleteSpot(spotId))
    return spot
  } else {
    return response
  }
}

// reducers
export default function spotsReducer(state, action){
  const newState = { ...state }
  switch(action.type){
    case READ:
      const normalize = {}
      action.payload.allSpots.forEach(spot => {
        normalize[spot.id] = spot
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
