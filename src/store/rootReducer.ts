import { combineReducers } from "redux";
import users from "./users/reducer";
import appState from "./appState/reducer";
import events from "./events/reducer";

export default combineReducers({
  users,
  events,
  appState,
});
