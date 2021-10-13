import { Space } from "./spaceTypes";
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
};

export type UserWithoutSpace = {
  id: number | null;
  name: string | null;
  email: string | null;
  token: string | null;
  space: null;
};

export type User = UserWithSpace | UserWithoutSpace;
