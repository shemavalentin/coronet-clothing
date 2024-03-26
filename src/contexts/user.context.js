import React, { createContext, useEffect, useReducer } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';
import { createAction } from "../utils/reducer/reducer.utils";

// Cse React contex possess two pieces let's first create
// 1. the actual value you want to access

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
}); 

// Using Reducers in context. useReducer works the the same as useState hook.
export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
    const { type, payload } = action;
    
    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
}

const INITIAL_STATE = {
    currentUser:null
}
// UserProvider: the actual component( the literal functional component)
// to allow any of it's children to access values of its use state.

export const UserProvider = ({ children }) => {
    // const [currentUser, setCurrentUser] = useState(null);

    const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE)
    const setCurrentUser = (user) => {
        dispatch( createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user))
    }

    const value = { currentUser, setCurrentUser };

    // M0 ounting the onAuthStateChangedListener which is an observer listener to User Context/ unmounting after run
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
/*
--------- REDUCERS -------------
These are functions that return object. It also receives a state (object state) and an action
Then it will rertun the current userState after performing such action.

const userReducer = (state, action) => {
return {
    currentUser: ...... These are needed to derive what the next value should be
        
    }
}
*/