import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSpotThunk } from '../../store/spots';

const CreateSpotForm = ({ }) => {
    const history = useHistory();
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);

    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateLat = (e) => setLat(e.target.value);
    const updateLng = (e) => setLng(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updateImageUrl = (e) => setImageUrl(e.target.value);

    useEffect(() => {
    const errors = [];

    if (!address.length) errors.push('Please provide an address');
    if (!city.length) errors.push('Please provide a city');
    if (!country.length) errors.push('Please provide a country');
    if (!lat) errors.push('Please provide a lat');
    if (!lng) errors.push('Please provide a lng');
    if (name.length < 0) errors.push('Name must be 1 or more characters');
    if (!description) errors.push('Please provide a description');
    if (price < 0 ) errors.push('Price must be 1 or higher');

    setValidationErrors(errors);
  }, [address, city, country, lat, lng, name, description, price, imageUrl]);

  const submitHandler = (e) => {
    e.preventDefault();

    console.log({ address, city, country, lat, lng, name, description, price, imageUrl });
    
  };
  
  // let createdSpot = dispatch(createSpotThunk(payload));
  // if (createdSpot) {
  //   history.push(`/api/spots/${spot.id}`);
  // }
  
  return (
    <form
      className="create-spot-form"
      onSubmit={submitHandler}
    >
      <h2>Create A Spot</h2>
      <ul className="errors">
        {validationErrors.length > 0 &&
          validationErrors.map((error) => <li key={error}>{error}</li>)}
      </ul>
      <label>
        Address
        <input
          type="text"
          address="address"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />
      </label>
      <label>
        City
        <input
          type="text"
          address="city"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
      </label>
      <label>
        Country
        <input
          type="text"
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </label>
     <label>
        Lat
        <input
          type="number"
          name="lat"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
      </label>
     <label>
        Lng
        <input
          type="number"
          name="lng"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
        />
      </label>
      <label>
        Name
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        </label>
      <label>
        Description
        <input
          type="text"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        </label>
      <label>
        Price
        <input
          type="number"
          name="price"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
        </label>
      <label>
        ImageUrl
        <input
          type="text"
          name="imageUrl"
          onChange={(e) => setImageUrl(e.target.value)}
          value={imageUrl}
        />
        </label>
      <button
        type="submit"
        disabled={!!validationErrors.length}
      >
        Submit
      </button>
    </form>
  );
}

export default CreateSpotForm;
