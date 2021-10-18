import { Space } from "./spaceTypes";
import { Event } from "./eventTypes";
export type Credentials = {
  email: string;
  password: string;
};

export type SignupData = {
  name: string;
  email: string;
  password: string;
};

export type UserWithSpace = {
  id: number | null;
  name: string | null;
  email: string | null;
  token: string | null;
  space: Space;
  userEvents: UserEvents[] | null;
};

export type UserWithoutSpace = {
  id: number | null;
  name: string | null;
  email: string | null;
  token: string | null;
  space: null;
  userEvents: UserEvents[] | null;
};

export type UserEvents = {
  id: number | null;
  eventId: number | null;
  userId: number | null;
  event: Event;
  quantity: number;
};

export type User = UserWithSpace | UserWithoutSpace;
