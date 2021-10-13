import { Event } from "../../types/eventTypes";
import { EventActions } from "./types";
import { FETCHED_EVENTS } from "./actions";

const initialState: Event[] = [];

export default function reducer(state = initialState, action: EventActions) {
  switch (action.type) {
    case FETCHED_EVENTS: {
      return [...action.payload];
    }
    default: {
      return state;
    }
  }
}
