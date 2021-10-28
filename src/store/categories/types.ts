import { Category } from "../../types/categoryTypes";
export type AllCategoriesAction = {
  type: string;
  payload: Category[];
};

export type categoriesActionTypes = AllCategoriesAction;
