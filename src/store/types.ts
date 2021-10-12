import { AppState } from "../types/appStateTypes";
import { User } from "../types/userTypes";
import { AppStateActionTypes } from "./appState/types";

export type StoreState = {
  users: User;
  appState: AppState;
};

export type GetState = () => StoreState;

export type AppActions = AppStateActionTypes;
