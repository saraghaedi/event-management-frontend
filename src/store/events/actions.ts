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
import { CreateEventAction } from "./types";
import { Event } from "../../types/eventTypes";
import { fetchEvents, fetchEventByid } from "./types";
import { selectToken } from "../users/selectors";

export const FETCHED_EVENTS = "FETCHED_EVENTS";
export const FETCHED_EVENT_BY_ID = "FETCHED_EVENT_BY_ID";
export const CREATE_NEW_EVENT = "CREATE_NEW_EVENT";

export const fetchedEvents = (events: Event[]): fetchEvents => ({
  type: FETCHED_EVENTS,
  payload: events,
});

export const fetchedEventById = (events: Event): fetchEventByid => ({
  type: FETCHED_EVENT_BY_ID,
  payload: events,
});

export const createEventAction = (event: Event): CreateEventAction => ({
  type: CREATE_NEW_EVENT,
  payload: event,
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

export const fetchEventsById = (id: string) => {
  return async (dispatch: Dispatch, getState: GetState) => {
    dispatch(appLoading());
    try {
      const response: any = await axios.get(`${apiUrl}/events/${id}`);
      dispatch(fetchedEventById(response.data));
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

export const createEvent = (event: Event) => {
  const {
    title,
    description,
    imageUrl,
    capacity,
    start_date,
    end_date,
    is_online,
    location,
    price,
  } = event;
  return async function thunk(dispatch: Dispatch, getState: GetState) {
    const token = selectToken(getState());
    try {
      dispatch(appLoading());
      const response: any = await axios.post(
        `${apiUrl}/events`,
        {
          title,
          description,
          imageUrl,
          capacity,
          start_date,
          end_date,
          is_online,
          location,
          price,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(createEventAction(response.data));
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
