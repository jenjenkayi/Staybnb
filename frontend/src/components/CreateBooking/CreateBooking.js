import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createBookingThunk } from '../../store/bookings';
import './CreateBooking.css';

const CreateBookingForm = () => {
    const { spotId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const currentSpot = useSelector(state => state.spots.singleSpot);
    const userId = user.id
    const currentSpotId = currentSpot.id

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errors, setErrors] = useState([]);

    const updateStartDate = (e) => setStartDate(e.target.value);
    const updateEndDate = (e) => setEndDate(e.target.value);

    const submitHandler = async (e) => {
      e.preventDefault();
      setErrors([]);  

      let Booking = { startDate, endDate}

      if (!Booking.startDate) return setErrors(["Please provide a start date"]);
      if (!Booking.endDate) return setErrors(["Please provide a end date"]);
      if (Booking.startDate < Booking.endDate) return setErrors(["Stars must be between 1 to 5"]);

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
                    required
                    onChange={updateStartDate} />
            </div>
            <div className='checkout-container'>
                <div className='checkin'>CHECK-OUT</div>
                <input
                    className='CreateBooking-Input'
                    type="date"     
                    value={endDate}
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
