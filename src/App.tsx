import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/navigation/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/users/actions";
import EventDetailsPage from "./pages/EventDetailPage/EventDetailPage";
import CreateEventForm from "./components/event/CreateEventForm";
import MyTicketsPage from "./pages/MyTickets/MyTicketsPage";
import MessageBox from "./components/general/MessageBox";

import HomePage from "./pages/Homepage/HomePage";
import MySpace from "./pages/MySpace/MySpace";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <NavBar />
      <MessageBox />
      {/* fix this part later- use a component to show loading */}
      {isLoading ? "loading" : null}
      <Switch>
        <Route path="/events/:id" component={EventDetailsPage} />
        <Route path="/:spaceId/new-event" component={CreateEventForm} />
        <Route path="/my-space" component={MySpace} />
        <Route path="/my-tickets" component={MyTicketsPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
