import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, NavLink } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/GetAllSpots";
import SingleSpot from "./components/GetSingleSpot";
import CreateSpot from "./components/CreateSpot";
import ManageSpot from "./components/ManageSpot";
import EditSpot from "./components/EditSpot";

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
          <Route exact path="/">
            <Spots />
          </Route>
          <Route path="/spots/new">
            <CreateSpot />
          </Route>
          <Route path="/spots/current">
            <ManageSpot />
          </Route>
          <Route path="/spots/:spotId">
            <SingleSpot />
          </Route>
          <Route path="/edits/spots/:spotId">
            <EditSpot />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
