import { Message } from "../../types/appStateTypes";

export const APP_LOADING = "APP_LOADING";
export const APP_DONE_LOADING = "APP_DONE_LOADING";
export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

export type appLoading = {
  type: typeof APP_LOADING;
};
export type appDoneLoading = {
  type: typeof APP_DONE_LOADING;
};
export type setMessage = {
  type: typeof SET_MESSAGE;
  message: Message;
};
export type clearMessage = {
  type: typeof CLEAR_MESSAGE;
};

export type showMessageWithTimeout = (
  variant: string,
  dismissable: boolean,
  text: string,
  timeOutMilliSeconds: number
) => void;

export type AppStateActionTypes =
  | appLoading
  | appDoneLoading
  | setMessage
  | clearMessage;
