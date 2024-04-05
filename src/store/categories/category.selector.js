import { createSelector } from "reselect";

// Using Memoization technique to ceate initial selector
// That gives us back that slice of the reducer we need which is the categories reducer

const selecteCategoryReducer = (state) => state.categories;

// Using that slice inside the memoize selector,
export const selectCategories = createSelector(
  [selecteCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

// Creating the condition to load data when the spinner is loading

export const selectCategoriesIsLoading = createSelector(
  [selecteCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
