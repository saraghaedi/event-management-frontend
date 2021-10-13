import { Event } from "../../types/eventTypes";

export type fetchEvents = {
  type: string;
  payload: Event[];
};

export type EventActions = fetchEvents;
