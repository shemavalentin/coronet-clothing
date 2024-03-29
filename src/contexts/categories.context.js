import React, { createContext, useState, useEffect } from 'react';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

// creating the context to store value that will be passed to the Provider
export const CategoriesContext = createContext({
    categoriesMap: {},
});

// We alse need to export the Provider

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    
    // Firing the bacth in products context which will fire once. Here I used useEffect
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments(); 
        
            setCategoriesMap(categoryMap)
        }
        getCategoriesMap();
    },[])

    const value = { categoriesMap };
    return (
        <CategoriesContext.Provider value={value }>{ children }</CategoriesContext.Provider>
    )
}