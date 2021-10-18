import { User } from "../../types/userTypes";
import { Space } from "../../types/spaceTypes";
import { BuyTicketAction, AddUserEvent } from "../events/types";

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

export type AuthTypes = fetchUser | tokenStillValid | logOut | AddUserEvent;

export type UserActionTypes =
  | AuthTypes
  | CreateSpaceAction
  | fetchSpaceByid
  | AddUserEvent;
