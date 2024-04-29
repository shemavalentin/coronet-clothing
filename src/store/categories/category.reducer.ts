
import { UnknownAction } from "redux";

import { Category } from "./category.types";

import { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailed } from "./category.action";


// Typing the initial state

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
}

export const CATEGORIES_INITIAL_STATE : CategoriesState = {
  categories: [],
  //Telling the reducer if it is in loading state for data it holds
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action : UnknownAction 
): CategoriesState => {
  if (fetchCategoriesStart.match(action)) {
    return { ...state, isLoading: true };
  }

  if (fetchCategoriesSuccess.match(action)) {
    
    return { ...state, categories: action.payload, isLoading: false };
  }

  if (fetchCategoriesFailed.match(action)) {
    return { ...state, error: action.payload, isLoading: false };
  }

  return state;
};
