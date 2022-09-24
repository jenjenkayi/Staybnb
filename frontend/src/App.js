import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GetAllSpots from "./components/GetAllSpots/GetAllSpots";
import GetCurrentSpots from "./components/GetCurrentSpots/GetCurrentSpots";
import CreateSpotForm from "./components/CreateSpotForm/CreateSpotForm";
import GetOneSpot from "./components/GetOneSpot/GetOneSpot";
import UpdateSpotForm from "./components/UpdateSpotForm/UpdateSpotForm";
import GetSpotReviews from "./components/GetSpotReviews/GetSpotReviews";
import GetUserReviews from "./components/GetUserReviews/GetUserReviews";
import LoginFormModal from "./components/LoginFormModal";
import CreateReviewForm from "./components/CreateReviewForm/CreateReviewForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/" >
            <GetAllSpots />
          </Route>
          <Route exact path="/currentSpots" >
            <GetCurrentSpots />
          </Route>
          <Route exact path="/spots/:spotId">
            <GetOneSpot />
          </Route>
          <Route exact path="/updateSpot/:spotId">
            <UpdateSpotForm />
          </Route>
          <Route exact path="/createSpot">
            <CreateSpotForm />
          </Route>
          <Route path="/spotReviews">
            <GetSpotReviews />
          </Route> 
          <Route path="/createReview/:spotId">
            <CreateReviewForm />
          </Route> 
          <Route path="/userReviews">
            <GetUserReviews />
          </Route> 
        </Switch>
      )}
    </>
  );
}

export default App;