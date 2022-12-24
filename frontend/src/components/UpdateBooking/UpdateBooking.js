import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateBookingThunk, getOneBookingThunk } from '../../store/bookings';
import './UpdateBooking.css';

const UpdateBooking = ({booking, setShowModal}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { bookingId } = useParams();
    const { spotId } = useParams();

    const user = useSelector(state => state.session.user);
    const currentSpot = useSelector(state => state.spots.singleSpot);
    const userId = user.id
    const currentSpotId = currentSpot.id

    console.log('currentSpotId', currentSpotId)

    const currBooking = useSelector(state => state.bookings.singleBooking);
    
    const bookings = useSelector(state => state.bookings.allBookings);
    const bookingsArr = Object.values(bookings);
    const userBookings = bookingsArr.filter(booking => booking.userId === user.id);
    console.log('booking', booking)

    const today = (new Date()).toISOString().slice(0, 10)

    const [startDate, setStartDate] = useState(booking?.startDate);
    const [endDate, setEndDate] = useState(booking?.endDate);
    const [errors, setErrors] = useState([]);

  //   useEffect(() => {
  //   dispatch(getOneBookingThunk(bookingId, spotId))
  // }, [dispatch, bookingId, spotId])

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
        setShowModal(false)
    })

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
