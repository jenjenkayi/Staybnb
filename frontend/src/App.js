import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import CreateSpotForm from "./components/CreateSpotForm";
import EditSpotForm from "./components/EditSpotForm";
import GetAllSpots from "./components/GetAllSpots";

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
          {/* <Route path="/login">
            <LoginFormPage />
          </Route> */}
          <Route path="/">
            <GetAllSpots />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/api/spots">
            <CreateSpotForm />
          </Route>
          <Route path="/api/spots/:spotId">
            <EditSpotForm />
          </Route>
          {/* <Route path="/api/reviews">
            <GetAllReviews />
          </Route> */}
        </Switch>
      )}
    </>
  );
}

export default App;