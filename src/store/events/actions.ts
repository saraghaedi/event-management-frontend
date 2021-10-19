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
import { CreateEventAction, BuyTicketAction, AddUserEvent } from "./types";
import { Event, EventUser } from "../../types/eventTypes";
import { fetchEvents, fetchEventByid, FetchEventUsers } from "./types";
import { selectToken } from "../users/selectors";
import { UserEvents } from "../../types/userTypes";

export const FETCHED_EVENTS = "FETCHED_EVENTS";
export const FETCHED_EVENT_BY_ID = "FETCHED_EVENT_BY_ID";
export const CREATE_NEW_EVENT = "CREATE_NEW_EVENT";
export const UPDATE_EVENT_DETAILS = "UPDATE_EVENT_DETAILS";
export const ADD_USER_EVENT = "ADD_USER_EVENT";
export const EVENT_USER_ATTENDANCE = "EVENT_USER_ATTENDANCE";

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

export const fetchedEventUserAttendance = (
  users: EventUser[]
): FetchEventUsers => ({
  type: EVENT_USER_ATTENDANCE,
  payload: users,
});

export const buyTicketAction = (event: Event): BuyTicketAction => ({
  type: UPDATE_EVENT_DETAILS,
  payload: event,
});

export const addEventToUserEvents = (userEvent: UserEvents): AddUserEvent => ({
  type: ADD_USER_EVENT,
  payload: userEvent,
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
      dispatch(createEventAction(response.data)); // new event.

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

export const buyTicket = (id: string, amount: number) => {
  return async (dispatch: Dispatch, getState: GetState) => {
    dispatch(appLoading());
    const token = selectToken(getState());
    try {
      const response: any = await axios.put(
        `${apiUrl}/events/${id}/buyTicket`,
        {
          amount,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(buyTicketAction(response.data.event)); // Update event
      // new action to add userAttend
      //console.log("What am i getting back", response.data.userAttend);
      dispatch(addEventToUserEvents(response.data.userAttend));
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

export const fetchEventUserAttendance = (id: string) => {
  return async (dispatch: Dispatch, getState: GetState) => {
    dispatch(appLoading());
    const token = selectToken(getState());
    try {
      const response: any = await axios.get(
        `${apiUrl}/events/${id}/attendance`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(fetchedEventUserAttendance(response.data.users));
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
