import { Event } from "../../types/eventTypes";

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

export type EventActions =
  | fetchEvents
  | fetchEventByid
  | CreateEventAction
  | BuyTicketAction;
