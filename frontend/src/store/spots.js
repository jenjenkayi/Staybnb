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

export const deleteSpot = (spotId) => ({
    type: DELETE,
    payload: spotId
})

// THUNKS
export const createSpotThunk = (spot) => async (dispatch) => {
  const response = await fetch('/api/spots', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(spot)
  });

  if(response.ok){
    const data = await response.json()
    const imgRes = await fetch(`api/spots/${spot.id}/images`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: spot.url,
        previewImage: spot.previewImage
      })
    })
    
    if(imgRes.ok){
    const imgData = await imgRes.json()
    data.previewImage = imgData.url;
    dispatch(createSpot(data))
    } 
  }
}

export const getAllSpotsThunk = () => async (dispatch) => {
  const response = await fetch('/api/spots')

  if(response.ok){
    const data = await response.json()
    console.log('data from thunkRead: ', data)
    dispatch(getAllSpots(data))
    return data
  } else {
    return response
  }
}

export const updateSpotThunk = (spot) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spot.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(spot)
  });

  if(response.ok){
    const data = await response.json()
    dispatch(createSpot(data))
    return spot
  } else {
    return response
  }
}

export const DeleteSpotThunk = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`, {
    method: 'DELETE'
  });

  if(response.ok){
    const data = await response.json()
    dispatch(deleteSpot(spotId))
    return data
  } else {
    return response
  }
}

// reducers
const initialState = {};
export default function spotsReducer(state = initialState, action){
  const newState = { ...state }
  switch(action.type){
    case READ:
      const normalize = {}
      action.payload.spots.forEach(spot => {
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
