import { StoreState } from "../types";

export const selectAppLoading = (state: StoreState) => state.appState.loading;
export const selectMessage = (state: StoreState) => state.appState.message;
