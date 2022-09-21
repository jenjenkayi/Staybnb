import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams} from 'react-router-dom';
import { updateSpotThunk } from '../../store/spots';

const UpdateSpotForm = ({ spot }) => {
  const { spotId } = useParams();
    const currentSpots = useSelector(state => state.spots.allSpots);
    const currentSpotsArr = Object.values(currentSpots);
    const currentSpot = currentSpotsArr.find(spot => spot.id == spotId)

    const history = useHistory();
    const dispatch = useDispatch();

    const [address, setAddress] = useState(currentSpot.address);
    const [city, setCity] = useState(currentSpot.city);
    const [state, setState] = useState(currentSpot.state);
    const [country, setCountry] = useState(currentSpot.country);
    const [lat, setLat] = useState(currentSpot.lat);
    const [lng, setLng] = useState(currentSpot.lng);
    const [name, setName] = useState(currentSpot.name);
    const [description, setDescription] = useState(currentSpot.description);
    const [price, setPrice] = useState(currentSpot.price);
    const [imageUrl, setImageUrl] = useState(currentSpot.imageUrl);
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
      dispatch(updateSpotThunk());
    }, [dispatch])

  const submitHandler = async (e) => {
    e.preventDefault();

    const payload = {
      id: spotId,
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
  
  let updatedSpot; 
  updatedSpot = await dispatch(updateSpotThunk(payload));

  if (updatedSpot) {
    history.push(`/spots/${updatedSpot.id}`);
  }
}

  const cancelHandler = (e) => {
    e.preventDefault();
    history.push('/currentSpots');
  };


  return (
    <section className="update-spot-form">
      <form  onSubmit={submitHandler}>
        <h2>Edit A Spot</h2>
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
        <button type="submit">Submit</button>
        <button type="button" onClick={cancelHandler}>Cancel</button>
      </form>
    </section>
  );
}

export default UpdateSpotForm;
