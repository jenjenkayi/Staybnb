import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllSpotsThunk } from '../../store/spots';
import CreateSpotForm from '../CreateSpotForm/CreateSpotForm'
import  GetSpotById from '../GetSpotById/GetSpotById';

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
    <h5>spots</h5>
  );
};

export default GetAllSpots;
