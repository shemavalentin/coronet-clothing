import React, { createContext, useState, useEffect } from 'react';
import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils';

//import SHOP_DATA from '../shoping-data.js';

// creating the context to store value that will be passed to the Provider
export const ProductsContext = createContext({
    products: [],
});

// We alse need to export the Provider

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    
    // Firing the bacth in products context which will fire once. Here I used useEffect
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);   
    // }, [])

    const value = { products };
    return (
        <ProductsContext.Provider value={value }>{ children }</ProductsContext.Provider>
    )
}