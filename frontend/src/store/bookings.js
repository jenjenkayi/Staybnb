import { csrfFetch } from './csrf';

// TYPES
const CREATE_BOOKING = 'bookings/CREATE_BOOKING'
const LOAD_ALL_BOOKINGS = 'bookings/LOAD_ALL_BOOKINGS'
const LOAD_ONE_BOOKING = 'bookings/LOAD_ONE_BOOKING'
const LOAD_USERS_BOOKINGS = 'bookings/LOAD_USERS_BOOKINGS'
const DELETE_BOOKING = 'bookings/DELETE_BOOKING'
const UPDATE_BOOKING = 'bookings/UPDATE_BOOKING'

// ACTION CREATORS
export const createBooking = (booking) => ({
    type: CREATE_BOOKING,
    payload: booking
})

export const getAllBookings = (bookings) => ({
    type: LOAD_ALL_BOOKINGS,
    payload: bookings
})


export const updateBooking = (booking) => ({
    type: UPDATE_BOOKING,
    payload: booking
})

export const getOneBooking = (booking) => ({
    type: LOAD_ONE_BOOKING,
    payload: booking
})

export const getUsersBookings = (bookings) => ({
    type: LOAD_USERS_BOOKINGS,
    payload: bookings
})

export const deleteBooking = (bookingId) => ({
    type: DELETE_BOOKING,
    payload: bookingId
})

// THUNKS
export const createBookingThunk = (data, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${data.spotId}/bookings`, {
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

  if(response.ok){
    const Booking = await response.json()
    dispatch(createBooking(Booking))
    return response
  }
}

export const getAllBookingsThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`)
  if(response.ok){
    const bookings = await response.json()
    dispatch(getAllBookings(bookings.Bookings))
    return bookings
  }
}

export const updateBookingThunk = (data, bookingId) => async (dispatch) => {
   const response = await csrfFetch(`/api/bookings/${bookingId}`, {
     method: 'PUT',
     headers: {
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if(response.ok){
      const data = await response.json()
      dispatch(updateBooking(data))
      return data;
  }
}

export const getOneBookingThunk = (spotId, bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings/${bookingId}`)

  if(response.ok){
    const data = await response.json()
    dispatch(getOneBooking(data))
    return response;
  }
}

export const getUserBookingsThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/bookings/current')
  if(response.ok){
    const bookings = await response.json()
    dispatch(getUsersBookings(bookings))
    return bookings
  }
}

export const deleteBookingThunk = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: 'DELETE',
  });

  if(response.ok){
    // const Booking = await response.json()
    dispatch(deleteBooking(bookingId))
    // return Booking
  } 
}

// reducers
const initialState = {allBookings:{}, singleBooking:{}}
export default function bookingsReducer(state=initialState, action){
  switch(action.type) {
    case CREATE_BOOKING: {
      const newState = { ...state, singleBooking:{}}
      newState.singleBooking = action.payload
      return newState
  }
    case LOAD_ALL_BOOKINGS: {
      const newState = { ...state, allBookings:{}}
        action.payload.Bookings.forEach(booking => {
        newState.allBookings[booking.id] = booking
      });
     return newState
    }
    case LOAD_USERS_BOOKINGS: {
      const newState = { ...state, allBookings:{}}
      action.payload.Bookings.forEach(booking => {
        newState.allBookings[booking.id] = booking
      });
     return newState
    }
    case LOAD_ONE_BOOKING: {
      const newState = {...state, singleBooking: action.payload}     
      return {...newState}
    }
    case UPDATE_BOOKING: {
      const newState = {...state, singleBooking:{}}
      newState.singleBooking = action.payload
      return newState
    }
    case DELETE_BOOKING: {
      const newState = { ...state, allBookings:{...state.allBookings}, singleBooking:{...state.singleBooking}}
      delete newState.allBookings[action.payload]
      delete newState.singleBooking[action.payload]
      return newState
    }
    default:
      return state
  }
}
