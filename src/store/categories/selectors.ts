import { StoreState } from "../types";
import { Category } from "../../types/categoryTypes";
export const selectAllCategories = (state: StoreState): Category[] =>
  state.categories.all;
