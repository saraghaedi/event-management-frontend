import {
  LOG_OUT,
  LOGIN_SUCCESS,
  TOKEN_STILL_VALID,
  CREATE_NEW_SPACE,
} from "./actions";
import { User } from "../../types/userTypes";
import { AuthTypes } from "../users/types";

const initialState: User = {
  id: null,
  name: null,
  email: null,
  token: localStorage.getItem("token"),
  space: null,
};

export default function reducer(state = initialState, action: AuthTypes) {
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
    default: {
      return state;
    }
  }
}
