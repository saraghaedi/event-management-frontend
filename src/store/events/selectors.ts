import { StoreState } from "../types";
import { Event, EventUser } from "../../types/eventTypes";
export const selectAllEvents = (state: StoreState): Event[] => state.events.all;
export const selectEventUsers = (state: StoreState): EventUser[] =>
  state.events.eventUsers;
export const selectEventdetails = (state: StoreState): Event =>
  state.events.eventDetails;
