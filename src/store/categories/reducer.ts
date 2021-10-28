import { Category } from "../../types/categoryTypes";
import { categoriesActionTypes } from "./types";
import { GET_ALL_CATEGORIES } from "./actions";
const initialState: { all: Category[] } = { all: [] };
export default function reducer(
  state = initialState,
  action: categoriesActionTypes
) {
  switch (action.type) {
    case GET_ALL_CATEGORIES: {
      return {
        all: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
