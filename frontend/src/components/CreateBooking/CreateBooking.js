import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createBookingThunk, getSpotBookingsThunk } from '../../store/bookings';
import './CreateBooking.css';

const CreateBookingForm = ({ today, startDate, setStartDate, endDate, setEndDate }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);
    const currentSpot = useSelector(state => state.spots.singleSpot);
    const userId = user.id
    const currentSpotId = currentSpot.id

    const bookings = useSelector(state => state.bookings.allBookings);
    const bookingsArr = Object.values(bookings);
    const spotBookings = bookingsArr.filter(booking => booking.spotId === currentSpotId);
    
    const [errors, setErrors] = useState([]);

    const numNights = Math.ceil(new Date(endDate).getTime() - new Date(startDate).getTime()) / (24 * 60 * 60 * 1000) 

    useEffect(() => {
    dispatch(getSpotBookingsThunk(currentSpotId))
  }, [dispatch, currentSpotId]);

    const submitHandler = async (e) => {
      e.preventDefault();
      setErrors([]);  

      let Booking = { startDate, endDate}

      if (Booking.startDate >= Booking.endDate) return setErrors(["Check-out date cannot be the same as or before the check-in date"]);
      
      for (let i=0; i < spotBookings.length; i++) {
          let booking = spotBookings[i]

        let bookedcheckin = new Date(booking.startDate).toISOString().slice(0, 10)
        let bookedcheckout = new Date(booking.endDate).toISOString().slice(0, 10)

        if (Booking.startDate === bookedcheckin || Booking.endDate === bookedcheckout) {
            return setErrors(["Sorry, this spot is already booked for the specified dates"])
        }

        if (Booking.startDate > bookedcheckin && Booking.startDate < bookedcheckout) {
            return setErrors(["Sorry, this spot is already booked for the specified dates"])
        }

        if (Booking.startDate < bookedcheckout && Booking.endDate > bookedcheckin && Booking.endDate < bookedcheckout) {
            return setErrors(["Sorry, this spot is already booked for the specified dates"])
        }

        if (Booking.startDate < bookedcheckin && Booking.endDate > bookedcheckout) {
            return setErrors(["Sorry, this spot is already booked for the specified dates"])
        }

      const payload = {
        userId: userId,
        spotId: currentSpotId,
        startDate,
        endDate
      };
  
     dispatch(createBookingThunk(payload)).then(() => {
        history.push('/userBookings');
      })
    }
}


  return (
    <section>
      <form className="CreateBooking-Container" onSubmit={submitHandler}>
        <ul className="errors">
          {errors.length > 0 &&
          errors.map((error) => <li key={error}>{error}</li>)}
        </ul>
        <div className='CreateBooking-Details'>
            <div className='checkin-container'>
                <div className='checkin'>CHECK-IN</div>
                <input
                    className='CreateBooking-Input'
                    type="date"
                    value={startDate}
                    min={today}
                    required
                    onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className='checkout-container'>
                <div className='checkin'>CHECK-OUT</div>
                <input
                    className='CreateBooking-Input'
                    type="date"     
                    value={endDate}
                    min={today}
                    required
                    onChange={(e) => setEndDate(e.target.value)} />
            </div>
        </div>
        {currentSpot.ownerId !== user.id ? 
        <button type="submit" className='CreateBooking-Button'>Reserve</button>
        :
        <button className="CreateBooking-Button1">Reserve</button>
        }
      </form>
      <div className='booking-text'>You won't be charged yet</div>
      <div className='booking-payment-container'>
        <div className='payment-info'>
            <div>${currentSpot.price} x {numNights} night(s)</div>
            <div>${currentSpot.price * numNights}</div>
        </div>
        <div className='payment-info'>
            <div>Cleaning fee</div>
            <div>${(currentSpot.price * 0.05).toFixed(2)}</div>
        </div>
        <div className='payment-info'>
            <div>Service fee</div>
            <div>${(currentSpot.price * 0.15).toFixed(2)}</div>
        </div>
        <div className='border'></div>
        <div className='payment-info'>
            <div><strong>Total before taxes</strong></div>
            <div>${currentSpot.price * numNights + currentSpot.price * 0.20}</div>
        </div>
      </div>
    </section>
  );
}

export default CreateBookingForm;
