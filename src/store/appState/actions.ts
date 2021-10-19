import { DEFAULT_MESSAGE_TIMEOUT } from "../../config/constants";
import { Dispatch } from "redux";
import {
  AppStateActionTypes,
  APP_LOADING,
  APP_DONE_LOADING,
  SET_MESSAGE,
  CLEAR_MESSAGE,
} from "./types";
import { AlertColor } from "@mui/material";

export const appLoading = (): AppStateActionTypes => ({ type: APP_LOADING });
export const appDoneLoading = (): AppStateActionTypes => ({
  type: APP_DONE_LOADING,
});
export const clearMessage = (): AppStateActionTypes => ({
  type: CLEAR_MESSAGE,
});

export const setMessage = (
  variant: AlertColor,
  dismissable: boolean,
  text: string
): AppStateActionTypes => {
  return {
    type: SET_MESSAGE,
    message: {
      variant,
      dismissable,
      text,
    },
  };
};

export const showMessageWithTimeout = (
  variant: AlertColor,
  dismissable: boolean,
  text: string,
  timeOutMilliSeconds: number
) => {
  return (dispatch: Dispatch) => {
    dispatch(setMessage(variant, dismissable, text));
    const timeout = timeOutMilliSeconds || DEFAULT_MESSAGE_TIMEOUT;
    setTimeout(() => dispatch(clearMessage()), timeout);
  };
};
