import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from '../../store/spots';
import CreateSpotForm from '../CreateSpotForm'

const GetAllSpots = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots);

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  if (!spots) {
    return null;
  }

//   return ();
};

export default GetAllSpots;
