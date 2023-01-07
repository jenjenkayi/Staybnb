import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllSpotsThunk } from '../../store/spots';
import "./SearchBar.css";

const SearchBar = () => {
  const dispatch = useDispatch();

  const spots = useSelector(state => state.spots.allSpots);
  const spotsArr = Object.values(spots);
  
  const [keyword, setKeyword] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const [result, setResult] = useState([])

  const results = keyword => {
    const res = []

    for (let i=0; i<spotsArr.length; i++) {
      let spot = spotsArr[i]
      keyword = keyword.toLowerCase()
      
      if (spot.city.toLowerCase().includes(keyword) || 
          spot.state.toLowerCase().includes(keyword) || 
          spot.country.toLowerCase().includes(keyword)) {
            res.push(spot)
          }
    }
    return res
  }
  useEffect(() => {
    dispatch(getAllSpotsThunk())
  }, [dispatch]);

  useEffect(() => {
    if (keyword.length) {
      setShowDropdown(true)
      setResult(results(keyword))
    } else {
      setShowDropdown(false)
      setResult([])
    }
  }, [keyword])


return (
  <>
     <form className="search-bar-form-container">
        <input
            className='search-bar-form-input'
            type="text"
            placeholder='Anywhere | City | State | Country'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit" className="search-bar-form-button">
            <i className="fa-solid fa-magnifying-glass"></i>
        </button>
    </form>
  
    <div className="searchbar-dropdown">
      {showDropdown && result.length > 0 && 
      <div>{result.map(spot => {
        return (
            <NavLink key={spot.id} to={`/spots/${spot.id}`} onClick={()=>setKeyword("")}>
            <div className='searchbar-results'>
            <img 
            className="searchbar-spot-img"
            src={spot.previewImage}
            alt=""
            />
            <div className="searchbar-spot-info">
            <div>{spot.name}</div>
            <div>{spot.city}</div>
            <div>{spot.state}</div>         
            <div>{spot.country}</div>         
            </div>
            </div>
            </NavLink>
        )
      })}
    </div>}
    </div>

    {(showDropdown && !result.length) && 
      <div className="searchbar-dropdown">We couldn't find any results for '{keyword}'</div>}
  </>
  )
}

export default SearchBar;
