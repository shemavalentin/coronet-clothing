import { CATEGORIES_ACTION_TYPES, Category} from "./category.types";

import { createAction, Action, ActionWithPayload } from "../../utils/reducer/reducer.utils";

// Typing FetchCategoriesStart action type
export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>

// Typing FetchCategoriesSuccess action type
export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>

// Typing fetchCategoriesFailed action type
export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>

// The above are the three action types our reducer will accept.
// Let' create a union to be able to pass these action types to reducer.

export type CategoryAction = FetchCategoriesStart | FetchCategoriesSuccess | FetchCategoriesFailed



// Let's create action, STARTING Action there won't be no payload needed
export const fetchCategoriesStart = () : FetchCategoriesStart =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray: Category[]): FetchCategoriesSuccess =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );

export const fetchCategoriesFailed = (error: Error): FetchCategoriesFailed =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);
