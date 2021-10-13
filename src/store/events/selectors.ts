import { StoreState } from "../types";
import { Event } from "../../types/eventTypes";
export const selectEvents = (state: StoreState): Event[] => state.events;
