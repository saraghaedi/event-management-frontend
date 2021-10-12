import { StoreState } from "../types";
export const selectToken = (state: StoreState) => state.users.token;
export const selectUser = (state: StoreState) => state.users;
