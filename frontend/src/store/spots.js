import { csrfFetch } from './csrf';

// TYPES
const CREATE_SPOT = 'spots/CREATE_SPOT'
const READ_ALL_SPOTS = 'spots/READ_ALL_SPOTS'
const READ_ONE_SPOT = 'spots/READ_ONE_SPOT'
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

export const updateSpot = (spot) => ({
    type: UPDATE_SPOT,
    payload: spot
})

export const deleteSpot = (spotId) => ({
    type: DELETE_SPOT,
    payload: spotId
})

// export const getUserSpots = (spots) => ({
//     type:
//     payload: spots
// })

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
    const data = await response.json()
    dispatch(createSpot(data))
    return data;
    // const imgRes = await csrfFetch(`api/spots/${spot.id}/images`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     url: spot.url,
    //     previewImage: spot.previewImage
    //   })
    // })
    
    // if(imgRes.ok){
    // const imgData = await imgRes.json()
    // data.previewImage = imgData.url;
    // dispatch(createSpot(data))
    // } 
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
    method: 'DELETE_SPOT'
  });

  if(response.ok){
    const data = await response.json()
    dispatch(deleteSpot(spotId))
    return data
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
const initialState = {allSpots:{}, singleSpot:{}};
export default function spotsReducer(state = initialState, action){
  switch(action.type){
    case CREATE_SPOT: {
      const newState = {...state}
      newState[action.payload.id] = action.payload
      // const spotList = newSpot.payload.map(id => newSpot[id]);
      // spotList.push(action.payload);
      // console.log('spotList', spotList);
      // newSpot.payload = spotList;
      return newState;
      // newState[action.payload.id] = action.payload
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
    case UPDATE_SPOT:{
      const newState = {...state}
      newState[action.payload.id] = { ...state[action.payload.id], ...action.payload }
      return newState
    }
    case DELETE_SPOT:{
      const newState = {...state}
      delete newState[action.SpotId]
      return newState
    }
    default:
      return state
  }
}

