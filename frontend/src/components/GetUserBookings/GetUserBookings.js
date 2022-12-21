import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
        <div className="userBookings-header">Bookings</div>
      <div className="userBookings-container">
            {isLoaded && !userBookings.length && <div className="userBookings-no-booking">There is no booking yet.</div>}
            {isLoaded && userBookings && userBookings.map(booking => {
                return (
                  <>
                {isLoaded && (
                  <div className="userBookings-container">
                  <img className='userBookings-image' src={booking.Spot[0].previewImage} alt=""></img>
                  <div className="userBookings-start">{(booking?.startDate).slice(0,10)}</div>
                  <div className="userBookings-end">{(booking?.endDate).slice(0,10)}</div>
                  <div className="userBookings-name">{booking.Spot[0].name}</div>
                  <div className="userBookings-address-container">
                    <div className="userBookings-address">{booking.Spot[0].address},</div>
                    <div className="userBookings-city">{booking.Spot[0].city}</div>
                    <div className="userBookings-state">{booking.Spot[0].state}</div>
                    <div className="userBookings-country">{booking.Spot[0].country}</div>
                  </div>
                  {user && <button className="userBookings-delete-button"
                  onClick={()=>deleteHandler(booking.id)}>Delete Booking
                  </button>}
                  {/* <NavLink to={`/updateBooking/${booking.id}`}>
                  <button className="UserBookings_Edit_Button">Edit Booking</button>
                  </NavLink> */}
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