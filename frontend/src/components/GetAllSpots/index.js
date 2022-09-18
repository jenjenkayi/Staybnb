import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from '../../store/spots';
import CreateSpotForm from '../CreateSpotForm'
import  GetSpotById from '../GetSpotById/index';

const GetAllSpots = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots);

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  if (!spots) {
    return null;
  }

  return (
    <div className="spots-view">
        <div className="spots-main-area">
            <div className="spot-list">
                {spots.map(spot =>
                    <GetSpotById
                        key={spot.id}
                        spot={spot}
                        // isSelected={selectedSpot && selectedSpot.id === spot.id}
                        // onClick={() => setSelectedSpot(spot)}
                        />
                )}
            </div>
        </div>
    </div>
  );
};

export default GetAllSpots;
