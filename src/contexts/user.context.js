import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener,createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';

// Cse React contex possess two pieces let's first create
// 1. the actual value you want to access

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
}); 

// UserProvider: the actual component( the literal functional component)
// to allow any of it's children to access values of its use state.
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    // Mounting the onAuthStateChangedListener which is an observer listener to User Context/ unmounting after run
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);                       
            }
            setCurrentUser(user);
         });
        return unsubscribe;
        
    }, [])

    //receiving the actual values from UserContext and rendering children 
    return <UserContext.Provider value={value} >{ children }</UserContext.Provider>

}