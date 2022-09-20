import { csrfFetch } from './csrf';

// TYPES
const CREATESPOT = 'spots/CREATESPOT'
const READALLSPOTS = 'spots/READALLSPOTS'
const READONESPOT = 'spots/READONESPOT'
const UPDATESPOT = 'spots/UPDATESPOT'
const DELETESPOT = 'spots/DELETESPOT'

// ACTION CREATORS
export const createSpot = (spot) => ({
    type: CREATESPOT,
    payload: spot
})

export const getAllSpots = (spots) => ({
    type: READALLSPOTS,
    payload: spots
})

export const getOneSpot = (spotId) => ({
    type: READONESPOT,
    payload: spotId
})

export const updateSpot = (spot) => ({
    type: UPDATESPOT,
    payload: spot
})

export const deleteSpot = (spotId) => ({
    type: DELETESPOT,
    payload: spotId
})

// export const getUserSpots = (spots) => ({
//     type:
//     payload: spots
// })

// THUNKS
export const createSpotThunk = (spot) => async (dispatch) => {
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(spot)
  });

  if(response.ok){
    const data = await response.json()
    const imgRes = await csrfFetch(`api/spots/${spot.id}/images`, {
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
  const response = await csrfFetch('/api/spots')

  if(response.ok){
    const data = await response.json()
    dispatch(getAllSpots(data.Spots))
    return data
  }
}

export const getOneSpotThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`)

  if(response.ok){
    const data = await response.json()
    dispatch(getOneSpot(data))
    return data
  }
}

export const updateSpotThunk = (spot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spot.id}`, {
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
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETESPOT'
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
//   const response = await csrfFetch(`api/spots/current`);

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
    case CREATESPOT:
      newState[action.payload.id] = action.payload
      return newState
    case READALLSPOTS:
      const allSpots = {...state}
      allSpots.spots = action.payload
      return allSpots
    case READONESPOT:
      const oneSpot = {...state}
      oneSpot.spots = action.payload
      return oneSpot
    case UPDATESPOT:
      newState[action.payload.id] = { ...state[action.payload.id], ...action.payload }
      return newState
    case DELETESPOT:
      delete newState[action.SpotId]
      return newState
    default:
      return state
  }
}

