import { Space } from "../../types/spaceTypes";
import { StoreState } from "../types";
export const selectToken = (state: StoreState) => state.users.token;
export const selectUser = (state: StoreState) => state.users;
export const selectUserEvents = (state: StoreState) => state.users.userEvents;
export const selectSpace = (state: StoreState): Space => state.users.space!;
export const selectSpaceId = (state: StoreState): number =>
  state.users.space!?.id;
