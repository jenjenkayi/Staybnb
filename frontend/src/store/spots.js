// TYPES
const CREATE = 'spots/CREATE'
const READALLSPOTS = 'spots/READALLSPOTS'
const READONESPOT = 'spots/READONESPOT'
const UPDATE = 'spots/UPDATE'
const DELETE = 'spots/DELETE'

// ACTION CREATORS
export const createSpot = (spot) => ({
    type: CREATE,
    payload: spot
})

export const getAllSpots = (spots) => ({
    type: READALLSPOTS,
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

// export const getUserSpots = (spots) => ({
//     type:
//     payload: spots
// })

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

// export const getCurrentUserSpots = () => async (dispatch) => {
//   const response = await fetch(`api/spots/current`);

//   if(response.ok){
//     const data = await response.json()
//     dispatch(getUserSpots(data))
//     return data
//   } else {
//     return response
//   }
// }

// reducers
const initialState = {};
export default function spotsReducer(state = initialState, action){
  const newState = { ...state }
  switch(action.type){
    case CREATE:
      newState[action.payload.id] = action.payload
      return newState
    // case READ:
    //   const allSpots = {}
    //   action.payload.forEach(spot => {
    //     allSpots[spot.id] = spot
    //   });
    //   return allSpots
    case UPDATE:
      newState[action.payload.id] = { ...state[action.payload.id], ...action.payload }
      return newState
    case DELETE:
      delete newState[action.SpotId]
      return newState
    default:
      return state
  }
}

