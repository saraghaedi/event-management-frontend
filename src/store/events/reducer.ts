import { Event, EventUser } from "../../types/eventTypes";
import { EventActions } from "./types";
import {
  FETCHED_EVENTS,
  FETCHED_EVENT_BY_ID,
  CREATE_NEW_EVENT,
  UPDATE_EVENT_DETAILS,
  EVENT_USER_ATTENDANCE,
} from "./actions";

const initialState: {
  all: Event[];
  eventDetails: Event;
  eventUsers: EventUser[];
} = {
  all: [],
  eventDetails: {
    id: null,
    title: null,
    description: null,
    imageUrl: null,
    start_date: null,
    end_date: null,
    capacity: null,
    is_online: null,
    location: null,
    price: null,
    spaceId: null,
  },
  eventUsers: [],
};

export default function reducer(state = initialState, action: EventActions) {
  switch (action.type) {
    case FETCHED_EVENTS: {
      return {
        ...state,
        all: action.payload,
      };
    }
    case FETCHED_EVENT_BY_ID: {
      return {
        ...state,
        eventDetails: action.payload,
      };
    }
    case CREATE_NEW_EVENT: {
      return {
        ...state,
        all: [...state.all, action.payload],
      };
    }
    case UPDATE_EVENT_DETAILS: {
      return {
        ...state,
        eventDetails: action.payload,
      };
    }
    case EVENT_USER_ATTENDANCE: {
      return {
        ...state,
        eventUsers: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
