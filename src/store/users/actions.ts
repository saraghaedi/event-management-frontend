import { User, Credentials, SignupData } from "../../types/userTypes";
import { AuthTypes } from "./types";
import axios from "axios";
import { Dispatch } from "redux";
import { GetState } from "../types";
import { apiUrl } from "../../config/constants";
import { selectToken } from "./selectors";
import {
  showMessageWithTimeout,
  setMessage,
  appDoneLoading,
  appLoading,
} from "../appState/actions";

export const LOG_OUT = "LOG_OUT";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const logOut = (): AuthTypes => ({ type: LOG_OUT, payload: null });

export const loginSuccess = (user: User): AuthTypes => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const tokenStillValid = (user: User): AuthTypes => ({
  type: "TOKEN_STILL_VALID",
  payload: user,
});

export const login = (credentials: Credentials) => {
  const { email, password } = credentials;
  return async function thunk(dispatch: Dispatch, getState: GetState) {
    try {
      dispatch(appLoading());
      const response: any = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
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

export const signUp = (signUpData: SignupData) => {
  return async (dispatch: Dispatch, getState: GetState) => {
    dispatch(appLoading());
    const { name, email, password } = signUpData;
    console.log("name", name, email, password);
    try {
      const response: any = await axios.post(`${apiUrl}/signup`, {
        email,
        password,
        name,
      });

      dispatch(loginSuccess(response.data));
      dispatch<any>(
        showMessageWithTimeout("success", false, "account created", 1500)
      );
      dispatch(appDoneLoading());
    } catch (error: any) {
      if (error.response) {
        dispatch(setMessage("error", true, error.response.data.message));
      } else {
        dispatch(setMessage("error", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch: Dispatch, getState: GetState) => {
    const token = selectToken(getState());

    if (token === null) return;
    dispatch(appLoading());
    try {
      const response: any = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
      dispatch(appDoneLoading());
      dispatch(logOut());
    }
  };
};
