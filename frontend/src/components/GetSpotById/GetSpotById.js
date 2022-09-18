import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const GetSpotById = () => {
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots[spotId]);

  return (
    <section>
  
      <Link to="/">Back to spot Index</Link>
    </section>
  );
}

export default GetSpotById;