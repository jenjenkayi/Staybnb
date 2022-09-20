import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { UpdateSpotThunk } from '../../store/spots';

const UpdateSpotForm = ({ spot }) => {
  //   const { spotId } = useParams();
  // const spots = useSelector(state => {
  //   return state.spots.map(spotId => state.spot[spotId]);
  // });
    const history = useHistory();
    const dispatch = useDispatch();

    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState('');
    const [country, setCountry] = useState(spot.country);
    const [lat, setLat] = useState(spot.lat);
    const [lng, setLng] = useState(spot.lng);
    const [name, setName] = useState(spot.name);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price);
    const [imageUrl, setImageUrl] = useState(spot.imageUrl);
    const [validationErrors, setValidationErrors] = useState([]);

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

   useEffect(() => {
      dispatch(());
    }, [dispatch])

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
  console.log("createdSpot", createdSpot)
  if (createdSpot) {
    history.push(`/api/spots/${createdSpot.id}`);
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

export default UpdateSpotForm;
