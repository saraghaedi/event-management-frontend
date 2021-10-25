import {
  LOG_OUT,
  LOGIN_SUCCESS,
  TOKEN_STILL_VALID,
  CREATE_NEW_SPACE,
  FETCHED_SPACE_BY_ID,
} from "./actions";

import { CREATE_NEW_EVENT, ADD_USER_EVENT } from "../events/actions";

import { User } from "../../types/userTypes";

const initialState: User = {
  id: null,
  name: null,
  email: null,
  token: localStorage.getItem("token"),
  space: null,
  userEvents: null,
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case LOG_OUT: {
      localStorage.removeItem("token");
      return { ...initialState, token: null };
    }
    case LOGIN_SUCCESS: {
      const userToken = action.payload!.token;
      if (userToken) localStorage.setItem("token", userToken);
      return { ...state, ...action.payload };
    }
    case TOKEN_STILL_VALID: {
      return { ...state, ...action.payload };
    }
    case CREATE_NEW_SPACE: {
      return { ...state, space: { ...action.payload, events: [] } };
    }
    case FETCHED_SPACE_BY_ID: {
      return { ...state, space: action.payload };
    }
    case CREATE_NEW_EVENT: {
      const newEvent = action.payload;
      return {
        ...state,
        space: {
          ...state.space,
          events: state.space?.events
            ? [...state.space?.events, newEvent]
            : [newEvent],
        },
      };
    }
    case ADD_USER_EVENT: {
      const exists = state.userEvents?.find(
        (e) => e.eventId === action?.payload?.eventId
      );

      if (exists) {
        const updatedEvents = state.userEvents?.map((e) => {
          return e.eventId === action.payload.eventId
            ? { ...action.payload }
            : e;
        });
        return {
          ...state,
          userEvents: updatedEvents,
        };
      } else {
        return {
          ...state,
          userEvents: state.userEvents
            ? [...state.userEvents, action.payload]
            : [action.payload],
        };
      }
    }
    default: {
      return state;
    }
  }
}
