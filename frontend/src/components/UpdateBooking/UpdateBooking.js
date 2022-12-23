import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateBookingThunk, getOneBookingThunk } from '../../store/bookings';
import './UpdateBooking.css';

const UpdateBooking = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { bookingId } = useParams();

    const user = useSelector(state => state.session.user);
    const currentSpot = useSelector(state => state.spots.singleSpot);
    const userId = user.id
    const currentSpotId = currentSpot.id

    const currBooking = useSelector(state => state.review.singleBooking);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
    dispatch(getOneBookingThunk(bookingId))
  }, [dispatch, bookingId])

    const submitHandler = async (e) => {
      e.preventDefault();
      setErrors([]);  

      const payload = {
        userId: userId,
        spotId: currentSpotId,
        startDate,
        endDate
      };
  
    dispatch(updateBookingThunk(payload)).then(() => {
        history.push('/userBookings');
    })
}


  return (
    <section>
      <form className="UpdateBooking-Container" onSubmit={submitHandler}>
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
        <button type="submit" className='UpdateBooking-Button'>Update</button>
      </form>      
    </section>
  );
}

export default UpdateBooking;
