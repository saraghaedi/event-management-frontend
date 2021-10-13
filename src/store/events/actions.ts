import axios from "axios";
import { Dispatch } from "redux";
import { GetState } from "../types";
import { apiUrl } from "../../config/constants";
import {
  showMessageWithTimeout,
  setMessage,
  appDoneLoading,
  appLoading,
} from "../appState/actions";
import { Event } from "../../types/eventTypes";
import { fetchEvents } from "./types";

export const FETCHED_EVENTS = "FETCHED_EVENTS";

export const fetchedEvents = (events: Event[]): fetchEvents => ({
  type: FETCHED_EVENTS,
  payload: events,
});

export const fetchAllEvents = () => {
  return async (dispatch: Dispatch, getState: GetState) => {
    dispatch(appLoading());
    try {
      const response: any = await axios.get(`${apiUrl}/events`);
      dispatch(fetchedEvents(response.data));
      dispatch(
        // @ts-ignore
        showMessageWithTimeout("success", false, "Welcome Back!", 4000)
      );
      dispatch(appDoneLoading());
    } catch (error: any) {
      if (error.response) {
        dispatch(setMessage("error", true, error.message));
      } else {
        dispatch(setMessage("error", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};
