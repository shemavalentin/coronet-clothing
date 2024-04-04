import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import { useDispatch } from "react-redux";
import Category from "../category/category.component";
import { fecthCategoriesAsync } from "../../store/categories/category.action";
//import { ProductsContainer } from './shop.styles';

const Shop = () => {
  const dispatch = useDispatch();
  // Firing the bacth in products context which will fire once. Here I used useEffect
  useEffect(() => {
    dispatch(fecthCategoriesAsync());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
