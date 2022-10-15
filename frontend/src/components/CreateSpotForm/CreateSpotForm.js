import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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
      if (!spot.description || spot.description.length < 10) return setErrors(['Please provide a description and it must be 10 or more characters']);
      if (!spot.price || spot.price < 0 ) return setErrors(['Price must be 1 or higher']);
      if (!spot.imageUrl.length) return setErrors(['Please provide an image']);
      if (!spot.imageUrl.includes('.jpg') && !spot.imageUrl.includes('.jpeg') && !spot.imageUrl.includes('.png')) return setErrors(['Image must be in .jpg, .jpeg, or .png format']);

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
    createdSpot = await dispatch(createSpotThunk(payload))
    history.push('/');

    if (createdSpot) {
      history.push('/');
      // history.push(`/spots/${createdSpot.id}`);
    }
  }
    const cancelHandler = (e) => {
      e.preventDefault();
      history.push('/');
  };  

  return (
    <section>
      <form className="CreateSpotForm_Container" onSubmit={submitHandler}>
        <div className="CreateSpotForm_Header">
        <h3 className="CreateSpotForm_Title">Create A Spot</h3>
      </div>
        <ul className="errors">
        {errors.length > 0 &&
        errors.map((error) => <li key={error}>{error}</li>)}
      </ul>
        <input
            className='CreateSpotForm_Input'
            type="text"
            placeholder='Address'
            value={address}
            // required
            onChange={updateAddress} />
        <input
            className='CreateSpotForm_Input'
            type="text"
            placeholder="City"
            value={city}
            // required
            onChange={updateCity} />
        <input
            className='CreateSpotForm_Input'
            type="text"
            placeholder="State"
            value={state}
            // required
            onChange={updateState} />
        <input
            className='CreateSpotForm_Input'
            type="text"
            placeholder="Country"
            value={country}
            // required
            onChange={updateCountry} />
        <input
            className='CreateSpotForm_Input'
            type="number"
            placeholder="Lat"
            value={lat}
            // required
            onChange={updateLat} />
          <input
            className='CreateSpotForm_Input'
            type="number"
            placeholder="Lng"
            value={lng}
            // required
            onChange={updateLng} />
          <input
            className='CreateSpotForm_Input'
            type="text"
            placeholder="Name"
            value={name}
            // required
            onChange={updateName} />
          <input
            className='CreateSpotForm_Input'
            type="text"
            placeholder="Description"
            value={description}
            // required
            onChange={updateDescription} />
          <input
            className='CreateSpotForm_Input'
            type="number"
            placeholder="Price"
            value={price}
            // required
            // min='1'
            onChange={updatePrice} />
          <input
            className='CreateSpotForm_Input'
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            // required
            onChange={updateImageUrl} />
        <button type="submit" className="CreateSpotForm_submit_button">Create Spot</button>
        <button type="button" className="CreateSpotForm_cancel_button" onClick={cancelHandler}>
        Cancel
        </button>
      </form>
    </section>
  );
}

export default CreateSpotForm;
