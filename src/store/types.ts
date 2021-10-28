import { AppState } from "../types/appStateTypes";
import { User } from "../types/userTypes";
import { Event, EventUser } from "../types/eventTypes";
import { Category } from "../types/categoryTypes";
import { AppStateActionTypes } from "./appState/types";
import { UserActionTypes } from "./users/types";
import { EventActions } from "./events/types";

export type StoreState = {
  users: User;
  events: {
    all: Event[];
    eventDetails: Event;
    eventUsers: EventUser[];
    searchedEvents: Event[];
    filteredEvents: Event[];
  };
  categories: {
    all: Category[];
  };
  appState: AppState;
};

export type GetState = () => StoreState;

export type AppActions = AppStateActionTypes | UserActionTypes | EventActions;
