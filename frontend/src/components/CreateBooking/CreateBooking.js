import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createBookingThunk, getUserBookingsThunk } from '../../store/bookings';
import './CreateBooking.css';

const CreateBookingForm = ({ today, startDate, setStartDate, endDate, setEndDate }) => {
    const { spotId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const currentSpot = useSelector(state => state.spots.singleSpot);
    const userId = user.id
    const currentSpotId = currentSpot.id

    const bookings = useSelector(state => state.bookings.allBookings);
    const bookingsArr = Object.values(bookings);

    // const [startDate, setStartDate] = useState('');
    // const [endDate, setEndDate] = useState('');
    const [errors, setErrors] = useState([]);

    const updateStartDate = (e) => setStartDate(e.target.value);
    const updateEndDate = (e) => setEndDate(e.target.value);

    const checkin = new Date(startDate) 
    const checkout = new Date(endDate) 
    
    const validations = () => {
        const errors = [];

        if (checkin >= checkout) return setErrors(["Check-out date cannot be the same as or before Check-in date"]);
        
        bookings?.map((booking) => {
        let bookedcheckin = new Date(booking.startDate)
        let bookedcheckout = new Date(booking.endDate)

        if (checkin === bookedcheckin ||
            checkin === bookedcheckout ||
            checkout === bookedcheckin ||
            checkout === bookedcheckout) {
            return setErrors(["Sorry, this spot is already booked for the specified dates"])
        }

        if (checkin > bookedcheckin && checkin < bookedcheckout) {
            return setErrors(["Sorry, this spot is already booked for the specified dates"])
        }

        if (checkin < bookedcheckout && checkout > bookedcheckin && checkout < bookedcheckout) {
            return setErrors(["Sorry, this spot is already booked for the specified dates"])
        }

        if (checkin < bookedcheckin && checkout > bookedcheckout) {
            return setErrors(["Sorry, this spot is already booked for the specified dates"])
        }

        return setErrors(errors);
        })
    }

    // useEffect(() => {
    //     dispatch(getUserBookingsThunk(spotId))
    //     validations()
    // }, [dispatch, spotId, checkin, checkout])

    const submitHandler = async (e) => {
      e.preventDefault();
      setErrors([]);  

      let Booking = { startDate, endDate}
      Booking.startDate = checkin
      Booking.endDate = checkout
      console.log('checkin', checkin)
      if (Booking.startDate >= Booking.endDate) return setErrors(["Check-out date cannot be the same as or before the check-in date"]);
        
    //   for (let i=0; i < bookings.length; i++) {
    //     let booking = bookings[i]
    //     let bookedcheckin = new Date(booking.startDate)
    //     let bookedcheckout = new Date(booking.endDate)

    //     if (checkin === bookedcheckin ||
    //         checkin === bookedcheckout ||
    //         checkout === bookedcheckin ||
    //         checkout === bookedcheckout) {
    //         return setErrors(["Sorry, this spot is already booked for the specified dates"])
    //     }

    //     if (checkin > bookedcheckin && checkin < bookedcheckout) {
    //         return setErrors(["Sorry, this spot is already booked for the specified dates"])
    //     }

    //     if (checkin < bookedcheckout && checkout > bookedcheckin && checkout < bookedcheckout) {
    //         return setErrors(["Sorry, this spot is already booked for the specified dates"])
    //     }

    //     if (checkin < bookedcheckin && checkout > bookedcheckout) {
    //         return setErrors(["Sorry, this spot is already booked for the specified dates"])
    //     }

      const payload = {
        userId: userId,
        spotId: currentSpotId,
        startDate,
        endDate
      };
  
      let createdBooking; 
  
      createdBooking = await dispatch(createBookingThunk(payload));

      if (createdBooking) {
        history.push('/userBookings');
      }
    // }
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
                    onChange={updateStartDate} />
            </div>
            <div className='checkout-container'>
                <div className='checkin'>CHECK-OUT</div>
                <input
                    className='CreateBooking-Input'
                    type="date"     
                    value={endDate}
                    min={today}
                    required
                    onChange={updateEndDate} />
            </div>
        </div>
        <button type="submit" className='CreateBooking-Button'>Reserve</button>
      </form>
      <div className='booking-text'>You won't be charged yet</div>
      <div className='booking-payment-container'>
        <div className='payment-info'>
            <div>${currentSpot.price} x {} nights</div>
            <div>${}</div>
        </div>
        <div className='payment-info'>
            <div>Cleaning fee</div>
            <div>${}</div>
        </div>
        <div className='payment-info'>
            <div>Service fee</div>
            <div>${}</div>
        </div>
        <div className='border'></div>
        <div className='payment-info'>
            <div><strong>Total before taxes</strong></div>
            <div>${}</div>
        </div>
      </div>
    </section>
  );
}

export default CreateBookingForm;
