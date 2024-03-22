import React, { createContext, useState, useEffect } from 'react';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

//import SHOP_DATA from '../shoping-data.js';

// creating the context to store value that will be passed to the Provider
export const ProductsContext = createContext({
    products: [],
});

// We alse need to export the Provider

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    
    // Firing the bacth in products context which will fire once. Here I used useEffect
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments(); 
            console.log(categoryMap);
        }
        getCategoriesMap();
    },[])

    const value = { products };
    return (
        <ProductsContext.Provider value={value }>{ children }</ProductsContext.Provider>
    )
}