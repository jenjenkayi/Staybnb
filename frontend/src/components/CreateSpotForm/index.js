import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

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

    useEffect(() => {
    const errors = [];

    if (name.length < 0) {
      errors.push('Name must be 1 or more characters');
    }

    setValidationErrors(errors);
  }, [address, city, country, lat, lng, name, description, price, imageUrl]);

  const submitHandler = (e) => {
    e.preventDefault();

    console.log({ address, city, country, lat, lng, name, description, price, imageUrl });

    history.push('/');
  };

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
