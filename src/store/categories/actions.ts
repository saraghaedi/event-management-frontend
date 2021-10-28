import axios from "axios";
import { Dispatch } from "redux";
import { GetState } from "../types";
import { apiUrl } from "../../config/constants";
import { Category } from "../../types/categoryTypes";
import { setMessage, appDoneLoading, appLoading } from "../appState/actions";
import { AllCategoriesAction } from "./types";

export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";

export const getAllCategories = (
  category: Category[]
): AllCategoriesAction => ({
  type: GET_ALL_CATEGORIES,
  payload: category,
});

export const fetchAllCategories = () => {
  return async (dispatch: Dispatch, getState: GetState) => {
    dispatch(appLoading());
    try {
      const response: any = await axios.get(`${apiUrl}/categories`);
      dispatch(getAllCategories(response.data));
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
