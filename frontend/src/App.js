import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GetAllSpots from "./components/GetAllSpots/GetAllSpots";
import CreateSpotForm from "./components/CreateSpotForm/CreateSpotForm";
import GetOneSpot from "./components/GetOneSpot/GetOneSpot";
import UpdateSpotForm from "./components/UpdateSpotForm/UpdateSpotForm";
import LoginFormModal from "./components/LoginFormModal";

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
          <Route exact path="/spots/:spotId">
            <GetOneSpot />
          </Route>
          <Route exact path="/api/createSpot">
            <CreateSpotForm />
          </Route>
          <Route path="/updateSpot/:spotId">
            <UpdateSpotForm />
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