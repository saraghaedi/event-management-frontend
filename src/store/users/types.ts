import { User } from "../../types/userTypes";
import { Space } from "../../types/spaceTypes";

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

export type CreateSpaceAction = {
  type: string;
  payload: Space;
};
export type fetchSpaceByid = {
  type: string;
  payload: Space;
};

export type AuthTypes = fetchUser | tokenStillValid | logOut;

export type UserActionTypes = AuthTypes | CreateSpaceAction | fetchSpaceByid;
