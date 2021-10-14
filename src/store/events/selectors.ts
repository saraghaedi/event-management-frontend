import { StoreState } from "../types";
import { Event } from "../../types/eventTypes";
export const selectAllEvents = (state: StoreState): Event[] => state.events.all;
export const selectEventdetails = (state: StoreState): Event =>
  state.events.eventDetails;
