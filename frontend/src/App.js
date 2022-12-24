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
import CreateReviewForm from "./components/CreateReviewForm/CreateReviewForm";
import UpdateReviewForm from "./components/UpdateReviewForm/UpdateReviewForm";
import GetUserBookings from "./components/GetUserBookings/GetUserBookings";
import Footer from "./components/Footer/Footer";

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
          <Route path="/createSpot">
            <CreateSpotForm />
          </Route>
          <Route  path="/spots/:spotId">
            <GetOneSpot />
          </Route>
          <Route path="/currentSpots" >
            <GetCurrentSpots />
          </Route>
          <Route path="/updateSpot/:spotId">
            <UpdateSpotForm />
          </Route>
          <Route path="/updateReview/:reviewId">
            <UpdateReviewForm />
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
           <Route path="/userBookings" >
            <GetUserBookings />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;