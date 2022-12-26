import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateBookingThunk, getUserBookingsThunk } from '../../store/bookings';
import './UpdateBooking.css';

const UpdateBooking = ({booking, setShowModal}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);
    const currentSpot = useSelector(state => state.spots.singleSpot);
    const userId = user.id
    const currentSpotId = currentSpot.id
    const bookingId = booking.id
  console.log('booking', booking)
    const bookings = useSelector(state => state.bookings.allBookings);
    const bookingsArr = Object.values(bookings);
    const spotBookings = bookingsArr.filter(booking => booking.spotId === currentSpotId);
    
    const today = (new Date()).toISOString().slice(0, 10)

    const [startDate, setStartDate] = useState(booking?.startDate.slice(0, 10));
    const [endDate, setEndDate] = useState(booking?.endDate.slice(0, 10));
    const [errors, setErrors] = useState([]);

    const submitHandler = async (e) => {
      e.preventDefault();
      setErrors([]);  

      let Booking = { startDate, endDate}

      if (startDate >= endDate) return setErrors(["Check-out date cannot be the same as or before the check-in date"]);
      
      for (let i=0; i < spotBookings.length; i++) {
          let booking = spotBookings[i]

        let bookedcheckin = new Date(booking.startDate).toISOString().slice(0, 10)
        let bookedcheckout = new Date(booking.endDate).toISOString().slice(0, 10)

        if (startDate === bookedcheckin || endDate === bookedcheckout) {
            return setErrors(["Sorry, this spot is already booked for the specified dates"])
        }

        if (startDate > bookedcheckin && startDate < bookedcheckout) {
            return setErrors(["Sorry, this spot is already booked for the specified dates"])
        }

        if (startDate < bookedcheckout && endDate > bookedcheckin && endDate < bookedcheckout) {
            return setErrors(["Sorry, this spot is already booked for the specified dates"])
        }

        if (Booking.startDate < bookedcheckin && Booking.endDate > bookedcheckout) {
            return setErrors(["Sorry, this spot is already booked for the specified dates"])
        }

      const payload = {
        userId: userId,
        bookingId: bookingId,
        startDate,
        endDate
      };
  
    dispatch(updateBookingThunk(payload, bookingId)).then(() => {
        history.push('/userBookings');
        setShowModal(false)
    dispatch(getUserBookingsThunk())
    })

  }
}


  return (
    <section>
      <form className="UpdateBooking-Container" onSubmit={submitHandler}>
        <div className="UpdateBooking-Header">Edit Your Booking</div>
        <ul className="errors">
          {errors.length > 0 &&
          errors.map((error) => <li key={error}>{error}</li>)}
        </ul>
        <div className='UpdateBooking-Details'>
            <div className='checkin-container'>
                <div className='checkin'>CHECK-IN</div>
                <input
                    className='UpdateBooking-Input'
                    type="date"
                    value={startDate}
                    min={today}
                    required
                    onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className='checkout-container'>
                <div className='checkin'>CHECK-OUT</div>
                <input
                    className='UpdateBooking-Input'
                    type="date"     
                    value={endDate}
                    min={today}
                    required
                    onChange={(e) => setEndDate(e.target.value)} />
            </div>
        </div>
            <div className='UpdateBooking-Buttons'>
              <button type="submit" className='UpdateBooking-Button'>Edit Booking</button>
              <button type="button" className="UpdateBooking-Button" onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      </form>      
    </section>
  );
}

export default UpdateBooking;
