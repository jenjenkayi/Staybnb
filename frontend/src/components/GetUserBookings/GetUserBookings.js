import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { getUserBookingsThunk, deleteBookingThunk } from '../../store/bookings';
import UpdateBooking from "../UpdateBooking";
import './GetUserBookings.css';

const GetUserBookings = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(state => state.session.user);
  const bookings = useSelector(state => state.bookings.allBookings);
  const bookingsArr = Object.values(bookings);
  const userBookings = bookingsArr.filter(booking => booking.userId === user.id);
  const [isLoaded, setIsLoaded] = useState(false)

  const today = (new Date()).toISOString().slice(0, 10)
  
  useEffect(() => {
    dispatch(getUserBookingsThunk())
    .then(() => setIsLoaded(true))
  }, [dispatch]);


  const deleteHandler = async (bookingId) => {
    if (window.confirm("Are you sure you want delete this booking?")) {
      await dispatch(deleteBookingThunk(bookingId));
    }
      history.push("/userBookings");
  }

  return (
    <>
        <div className="userBookings-header">My Bookings</div>
           <div className="userBookings-container">
            {isLoaded && !userBookings.length && <div className="userBookings-no-booking">There is no booking yet.</div>}
            {isLoaded && userBookings && userBookings.map(booking => {
                return (
                  <>
                {isLoaded && (
                  <div className="userBookings-container1">
                    <div className="userBookings-wrapper">
                      <img className='userBookings-image' src={booking.Spot[0].previewImage} alt="" 
                      onClick={() => history.push(`/spots/${booking.Spot[0].id}`)}></img>
                    <div className="userBookings-details">
                        <div className="userBookings-name" onClick={() => history.push(`/spots/${booking.Spot[0].id}`)}>
                          {booking.Spot[0].name}</div>
                          <div className="userBookings-info">
                            <strong>Address:</strong>
                            <div>{booking.Spot[0].address}</div>
                          </div>
                          <div className="userBookings-info">
                            <strong>City, State:</strong>
                            <div>{booking.Spot[0].city}, {booking.Spot[0].state}</div>
                          </div>
                          <div className="userBookings-info">
                            <strong>Country:</strong>
                            <div>{booking.Spot[0].country}</div>
                          </div>
                        <div className="userBookings-info">
                          <div><strong>Check in:</strong></div>
                          <div>{(booking?.startDate).slice(0,10)}</div>
                        </div>
                        <div className="userBookings-info">
                          <div><strong>Check out:</strong></div> 
                          <div>{(booking?.endDate).slice(0,10)}</div>
                        </div>
                      <div className="userBookings-buttons-container">
                          {new Date(booking.startDate).toISOString().slice(0, 10) > today ?
                          <div>  
                            <UpdateBooking booking={booking} />
                          </div> :
                          <button className="userBookings-buttons1">Past booking cannot be edited or deleted</button>}
                        <div>
                        {new Date(booking.startDate).toISOString().slice(0, 10) > today && user && 
                        <button className="userBookings-buttons"
                        onClick={()=>deleteHandler(booking.id)}>Cancel Booking
                        </button>}
                        </div>
                      </div>
                      </div>
                    </div>
                </div>
                )}
                  </>
                )
              })}
      </div>
  </>
  );

};

export default GetUserBookings;