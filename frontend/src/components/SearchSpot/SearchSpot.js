import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllSpotsThunk } from '../../store/spots';
import "./SearchSpot.css";

const SearchSpot = () => {
  const dispatch = useDispatch();

  const spots = useSelector(state => state.spots.allSpots);
  const spotsArr = Object.values(spots);

  const [keyword, setKeyword] = useState("")

  useEffect(() => {
    dispatch(getAllSpotsThunk())
  }, [dispatch]);


return (
     <form className="search-bar-form-container" 
    //  onSubmit={submitHandler}
     >
        <input
            className='search-bar-form-input'
            type="text"
            placeholder='Search for anything'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="search-bar-form-button">
            <i className="fa-solid fa-magnifying-glass fa-xl"></i>
        </button>
    </form>
  )

}

export default SearchSpot;
