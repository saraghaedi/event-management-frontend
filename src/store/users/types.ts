import { User } from "../../types/userTypes";

export type logOut = {
  type: string;
  payload: null;
};

export type fetchUser = {
  type: string;
  payload: User;
};

export type tokenStillValid = {
  type: string;
  payload: User;
};

export type AuthTypes = fetchUser | tokenStillValid | logOut;
