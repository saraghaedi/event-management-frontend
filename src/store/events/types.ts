import { Event, EventUser } from "../../types/eventTypes";
import { UserEvents } from "../../types/userTypes";

export type fetchEvents = {
  type: string;
  payload: Event[];
};

export type fetchEventByid = {
  type: string;
  payload: Event;
};

export type CreateEventAction = {
  type: string;
  payload: Event;
};

export type BuyTicketAction = {
  type: string;
  payload: Event;
};

export type AddUserEvent = {
  type: string;
  payload: UserEvents;
};

export type FetchEventUsers = {
  type: string;
  payload: EventUser[];
};

export type searchEvents = {
  type: string;
  payload: Event[];
};
export type FilterEvents = {
  type: string;
  payload: Event[];
};

export type EventActions =
  | fetchEvents
  | fetchEventByid
  | CreateEventAction
  | BuyTicketAction
  | AddUserEvent
  | FetchEventUsers
  | searchEvents
  | FilterEvents;
