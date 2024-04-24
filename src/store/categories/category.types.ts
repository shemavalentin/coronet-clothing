export enum CATEGORIES_ACTION_TYPES {
  //SET_CATEGORIES: " category/SET_CATEGORIES",
  FETCH_CATEGORIES_START = "category/FETCH_CATEGORIES_START",
  FETCH_CATEGORIES_SUCCESS = "category/FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_FAILED = "category/FETCH_CATEGORIES_FAILED",
};

// category array type

export type CategoryItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

// Type
export type Category = {
  title: string;
  imageUrl: string;
  items: CategoryItem[];
};

// Category Map Type

export type CategoryMap = {
  [key: string]: CategoryItem[];
}