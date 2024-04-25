import { CATEGORIES_ACTION_TYPES, Category} from "./category.types";

import { createAction, Action, ActionWithPayload, withMatcher } from "../../utils/reducer/reducer.utils";

// Typing FetchCategoriesStart action type
export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>

// Typing FetchCategoriesSuccess action type
export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>

// Typing fetchCategoriesFailed action type
export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>

// The above are the three action types our reducer will accept.
// Let' create a Descriminatory union to be able to pass these action types to reducer.

// export type CategoryAction = FetchCategoriesStart | FetchCategoriesSuccess | FetchCategoriesFailed

// Let's create action, STARTING Action there won't be no payload needed
export const fetchCategoriesStart = withMatcher (() : FetchCategoriesStart =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START));

export const fetchCategoriesSuccess = withMatcher((categoriesArray: Category[]): FetchCategoriesSuccess =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  ));

export const fetchCategoriesFailed = withMatcher ((error: Error): FetchCategoriesFailed =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error));
