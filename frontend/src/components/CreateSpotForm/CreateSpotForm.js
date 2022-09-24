import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createSpotThunk } from '../../store/spots';
import './CreateSpotForm.css';

const CreateSpotForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState([]);

    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateLat = (e) => setLat(e.target.value);
    const updateLng = (e) => setLng(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updateImageUrl = (e) => setImageUrl(e.target.value);
    
    const submitHandler = async (e) => {
      e.preventDefault();
      setErrors([]);

      let spot = {address, city, state, country, lat, lng, name, description, price, imageUrl}
      
      if (!spot.address.length) return setErrors(['Please provide an address']);
      if (!spot.city.length) return setErrors(['Please provide a city']);
      if (!spot.state.length) return setErrors(['Please provide a state']);
      if (!spot.country.length) return setErrors(['Please provide a country']);
      if (!spot.lat) return setErrors(['Please provide a lat']);
      if (!spot.lng) return setErrors(['Please provide a lng']);
      if (!spot.name.length < 0) return setErrors(['Name must be 1 or more characters']);
      if (!spot.description) return setErrors(['Please provide a description']);
      if (!spot.price < 0 ) return setErrors(['Price must be 1 or higher']);
    
      const payload = {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        imageUrl,
      };
    
    let createdSpot; 
    createdSpot = await dispatch(createSpotThunk(payload));
    
    if (createdSpot) {
      // history.push(`/spots/${createdSpot.id}`);
      history.push('/');
    }
  }
    const cancelHandler = (e) => {
      e.preventDefault();
      setErrors();
      history.push('/');
  };  

  return (
    <section>
      <form className="create-spot-form" onSubmit={submitHandler}>
        <h2>Create A Spot</h2>
        <ul className="errors">
        {errors.length > 0 &&
        errors.map((error) => <li key={error}>{error}</li>)}
      </ul>
        <input
            type="text"
            placeholder='Address'
            value={address}
            // required
            onChange={updateAddress} />
        <input
            type="text"
            placeholder="City"
            value={city}
            // required
            onChange={updateCity} />
        <input
            type="text"
            placeholder="State"
            value={state}
            // required
            onChange={updateState} />
        <input
            type="text"
            placeholder="Country"
            value={country}
            // required
            onChange={updateCountry} />
        <input
            type="number"
            placeholder="Lat"
            value={lat}
            // required
            onChange={updateLat} />
          <input
            type="number"
            placeholder="Lng"
            value={lng}
            // required
            onChange={updateLng} />
          <input
            type="text"
            placeholder="Name"
            value={name}
            // required
            onChange={updateName} />
          <input
            type="text"
            placeholder="Description"
            value={description}
            // required
            onChange={updateDescription} />
          <input
            type="number"
            placeholder="Price"
            value={price}
            // required
            min='1'
            onChange={updatePrice} />
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            // required
            onChange={updateImageUrl} />
        <button type="submit">Create Spot</button>
        {/* disabled={!!errors.length} */}
        <button type="button" onClick={cancelHandler}>Cancel</button>
      </form>
    </section>
  );
}

export default CreateSpotForm;
