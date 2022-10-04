import { csrfFetch } from './csrf';

// TYPES
const CREATE_SPOT = 'spots/CREATE_SPOT'
const READ_ALL_SPOTS = 'spots/READ_ALL_SPOTS'
const READ_ONE_SPOT = 'spots/READ_ONE_SPOT'
const READ_USER_SPOTS = 'spots/READ_USER_SPOTS'
const UPDATE_SPOT = 'spots/UPDATE_SPOT'
const DELETE_SPOT = 'spots/DELETE_SPOT'

// ACTION CREATORS
export const createSpot = (spot) => ({
    type: CREATE_SPOT,
    payload: spot
})

export const getAllSpots = (spots) => ({
    type: READ_ALL_SPOTS,
    payload: spots
})

export const getOneSpot = (spot) => ({
    type: READ_ONE_SPOT,
    payload: spot
})

export const getCurrentSpots = (spots) => ({
    type: READ_USER_SPOTS,
    payload: spots
})

export const updateSpot = (spot) => ({
    type: UPDATE_SPOT,
    payload: spot
})

export const deleteSpot = (spotId) => ({
    type: DELETE_SPOT,
    payload: spotId
})


// THUNKS
export const createSpotThunk = (data) => async (dispatch) => {
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(data)
  });

  if(response.ok){
    const spotData = await response.json()  //new created spot
    console.log("data", spotData)
    const imgRes = await csrfFetch(`api/spots/${spotData.id}/images`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: data.imageUrl,
        spotId: spotData.id,
        // preview: data.preview
      })
    })

    if(imgRes.ok){
    const imgData = await imgRes.json()
    spotData.previewImage = imgData.url;
    dispatch(createSpot(spotData))
    } 
  }
}

export const getAllSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots')

  if(response.ok){
    const data = await response.json()
    dispatch(getAllSpots(data.Spots))
  }
}

export const getOneSpotThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`)

  if(response.ok){
    const data = await response.json()
    dispatch(getOneSpot(data))
    return response;
  }
}

export const getCurrentSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch(`api/spots/current`);

  if(response.ok){
    const data = await response.json()
    dispatch(getCurrentSpots(data.Spots))
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
    dispatch(updateSpot(data))
    return data
  }
}

export const deleteSpotThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE'
  });

  if(response.ok){
    const data = await response.json()
    dispatch(deleteSpot(spotId))
    return data;
  } 
  // return response;
}

// reducers
const initialState = {allSpots:{}, singleSpot:{}};
export default function spotsReducer(state = initialState, action){
  switch(action.type){
    case CREATE_SPOT: {
      const newState = {...state}
      newState[action.payload.id] = action.payload
      return newState;
    }
    case READ_ALL_SPOTS: {
      const newState = {...state, allSpots:{...state.allSpots}}
      action.payload.forEach(spot => {
        newState.allSpots[spot.id] = spot
      })
      return newState
    }
    case READ_ONE_SPOT: {
      const newState = {...state, singleSpot:{...state.singleSpot}}
      newState.singleSpot = action.payload
      return newState
    }
    case READ_USER_SPOTS: {
      // const newState = {...state, singleSpot:{...state.singleSpot}}
      // console.log("newState", newState)
      // action.payload.forEach(spot => {
      //   newState.singleSpot[spot.id] = spot
      // })
      const newState = {...state, singleSpot:{...state.singleSpot}}
      newState.singleSpot = action.payload
      return newState
    }
    case UPDATE_SPOT: {
      // const newState = {...state}
      // newState[action.payload.id] = action.payload
      // return newState
      const newState = {...state, singleSpot:{...state.singleSpot}}
      newState.singleSpot[action.payload.id] = action.payload
      return newState
    }
    case DELETE_SPOT:{
      const newState = {...state, singleSpot:{...state.singleSpot}}
      delete newState.singleSpot[action.payload]
      return newState
    }
    default:
      return state
  }
}

