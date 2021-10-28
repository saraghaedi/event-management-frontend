import { StoreState } from "../types";
import { Event, EventUser } from "../../types/eventTypes";
export const selectAllEvents = (state: StoreState): Event[] => state.events.all;
export const selectEventUsers = (state: StoreState): EventUser[] =>
  state.events.eventUsers;
export const selectEventdetails = (state: StoreState): Event =>
  state.events.eventDetails;
export const selectSearchedEvents = (state: StoreState): Event[] =>
  state.events.searchedEvents;
export const selectFilteredEvents = (state: StoreState): Event[] =>
  state.events.filteredEvents;
