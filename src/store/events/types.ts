import { Event } from "../../types/eventTypes";
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

export type EventActions =
  | fetchEvents
  | fetchEventByid
  | CreateEventAction
  | BuyTicketAction
  | AddUserEvent;
