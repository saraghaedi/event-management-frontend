import { AppState } from "../types/appStateTypes";
import { User } from "../types/userTypes";
import { Event } from "../types/eventTypes";
import { AppStateActionTypes } from "./appState/types";

export type StoreState = {
  users: User;
  events: Event[];
  appState: AppState;
};

export type GetState = () => StoreState;

export type AppActions = AppStateActionTypes;
