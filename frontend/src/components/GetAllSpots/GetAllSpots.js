import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllSpotsThunk } from '../../store/spots';
import CreateSpotForm from '../CreateSpotForm/CreateSpotForm'
import  GetSpotById from '../GetSpotById/GetSpotById';

const GetAllSpots = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spots = useSelector(state => {
    return state.spots.map(spotId => state.spots[spotId]);
  });

  console.log("these are spots", spots)

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  if (!spots) {
    return null;
  }

  return (
    <div className="header">
         <img className="header-logo"
              src=''
              alt=""
         />
         {/* <div className="spot-list">
                {spots.map(spot =>
                <GetSpotById
                    key={spot.id}
                    spot={spot} */}
                        {/* // isSelected={selectedSpot && selectedSpot.id === spot.id}
                        // onClick={() => setSelectedSpot(spot)} */}
                {/* />
                )}
            </div> */}
        {/* </div> */}
    </div>
  );
};

export default GetAllSpots;
