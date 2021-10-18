import React from "react";
import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/navigation/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/users/actions";
import EventDetailsPage from "./pages/EventDetailPage";
import CreateEventForm from "./components/event/CreateEventForm";
import MyTicketsPage from "./pages/MyTicketsPage";

import HomePage from "./pages/HomePage";
import MySpace from "./pages/MySpace";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <NavBar />
      {/* fix this part later- use a component to show loading */}
      {isLoading ? "loading" : null}
      <Switch>
        <Route exact path="/events/:id" component={EventDetailsPage} />
        <Route exact path="/:spaceId/newEvent" component={CreateEventForm} />
        <Route exact path="/mySpace" component={MySpace} />
        <Route exact path="/myTickets" component={MyTicketsPage} />
        <Route exact path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
