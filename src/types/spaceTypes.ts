import { Event } from "./eventTypes";

export type Space = {
  id: number;
  title: string;
  description: string;
  logo_url: string | null;
  events: Event[];
};
