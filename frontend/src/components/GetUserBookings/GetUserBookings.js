import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { getUserBookingsThunk, deleteBookingThunk } from '../../store/bookings';
import './GetUserBookings.css';

const GetUserBookings = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(state => state.session.user);
  const bookings = useSelector(state => state.bookings.allBookings);
  const bookingsArr = Object.values(bookings);
  const userBookings = bookingsArr.filter(booking => booking.userId === user.id);

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(getUserBookingsThunk())
    .then(() => setIsLoaded(true))
  }, [dispatch]);


  const deleteHandler = async (bookingId) => {
      await dispatch(deleteBookingThunk(bookingId));
      history.push("/");
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
                  <div className="userBookings-container">
                    <div className="userBookings-wrapper">
                    <img className='userBookings-image' src={booking.Spot[0].previewImage} alt=""></img>
                    <div className="userBookings-details">
                        <div className="userBookings-name">{booking.Spot[0].name}</div>
                        <div className="userBookings-address-container">
                            <div className="userBookings-address"><strong>Address:</strong> {booking.Spot[0].address},</div>
                            <div className="userBookings-city-state">{booking.Spot[0].city}, {booking.Spot[0].state}</div>
                            <div className="userBookings-country">{booking.Spot[0].country}</div>
                        </div>
                        <div className="userBookings-start"><strong>Check In: </strong>{(booking?.startDate).slice(0,10)}</div>
                        <div className="userBookings-end"><strong>Check Out:</strong> {(booking?.endDate).slice(0,10)}</div>
                    </div>
                    <div className="userBookings-buttons">
                        <NavLink to={`/editBooking/${booking.id}`}>
                            {user && <button className="userBookings-buttons">Edit Booking</button>}
                        </NavLink>
                        {user && <button className="userBookings-buttons"
                        onClick={()=>deleteHandler(booking.id)}>Cancel Booking
                        </button>}
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