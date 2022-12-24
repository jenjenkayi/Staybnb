import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UpdateBooking from './UpdateBooking';
import './UpdateBooking.css';

function UpdateBookingModal({booking}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='userBookings-buttons' onClick={() => setShowModal(true)}>Edit Booking</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateBooking booking={booking} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default UpdateBookingModal;