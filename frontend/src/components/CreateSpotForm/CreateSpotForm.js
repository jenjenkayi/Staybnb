import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createSpotThunk, getAllSpots } from '../../store/spots';
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
    
  //   useEffect(() => {
  //   const errors = [];

  //   if (!address.length) errors.push('Please provide an address');
  //   if (!city.length) errors.push('Please provide a city');
  //   if (!country.length) errors.push('Please provide a country');
  //   if (!lat) errors.push('Please provide a lat');
  //   if (!lng) errors.push('Please provide a lng');
  //   if (name.length < 0) errors.push('Name must be 1 or more characters');
  //   if (!description) errors.push('Please provide a description');
  //   if (price < 0 ) errors.push('Price must be 1 or higher');

  //   setValidationErrors(errors);
  // }, [address, city, country, lat, lng, name, description, price, imageUrl]);

  // const submitHandler = (e) => {
  //   e.preventDefault();

  //   console.log({ address, city, country, lat, lng, name, description, price, imageUrl });
    
  // };

  // useEffect(() => {
  //     dispatch(getAllSpots());
  //   }, [dispatch])

  const submitHandler = async (e) => {
    e.preventDefault();

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
      imageUrl
    };
  
  let createdSpot; 
  
  createdSpot = await dispatch(createSpotThunk(payload));
  if (createdSpot) {
    history.push(`/spots/${createdSpot.id}`);
  }
}

  const cancelHandler = (e) => {
    e.preventDefault();
  };

  return (
    <section>
      <form className="create-spot-form" onSubmit={submitHandler}>
        <h2>Create A Spot</h2>
        <input
            type="text"
            placeholder='Address'
            value={address}
            required
            onChange={updateAddress} />
        <input
            type="text"
            placeholder="City"
            value={city}
            required
            onChange={updateCity} />
        <input
            type="text"
            placeholder="State"
            value={state}
            required
            onChange={updateState} />
        <input
            type="text"
            placeholder="Country"
            value={country}
            required
            onChange={updateCountry} />
        <input
            type="number"
            placeholder="Lat"
            value={lat}
            required
            onChange={updateLat} />
          <input
            type="number"
            placeholder="Lng"
            value={lng}
            required
            onChange={updateLng} />
          <input
            type="text"
            placeholder="Name"
            value={name}
            required
            onChange={updateName} />
          <input
            type="text"
            placeholder="Description"
            value={description}
            required
            onChange={updateDescription} />
          <input
            type="number"
            placeholder="Price"
            value={price}
            required
            min='0'
            onChange={updatePrice} />
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            required
            onChange={updateImageUrl} />
        <button type="submit">Create Spot</button>
        <button type="button" onClick={cancelHandler}>Cancel</button>
      </form>
    </section>
  );
}

export default CreateSpotForm;
