import { Event } from "./eventTypes";

export type Space = {
  title: string;
  description: string;
  logo_url: string | null;
  events: Event[];
};
