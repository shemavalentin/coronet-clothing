import React, { createContext, useState } from 'react';
import PRODUCTS from '../shoping-data.json';

// creating the context to store value that will be passed to the Provider
export const ProductsContext = createContext({
    products: [],
});

// We alse need to export the Provider

export const ProductsProvider = ({ children }) => {
    const [ products, setProducts ] = useState(PRODUCTS);
    const value = { products };
    return (
        <ProductsContext.Provider value={value }>{ children }</ProductsContext.Provider>
    )
}