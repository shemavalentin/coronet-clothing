import { UnknownAction } from "redux";

//import { USER_ACTION_TYPES } from "./user.types";

import {
  signInFailed,
  signUpFailed,
  signOutFailed,
  signOutSuccess,
  signInSuccess,
} from "./user.action";

import { UserData } from "../../utils/firebase/firebase.utils";
//import { match } from "assert";

// Typing out the inital state

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;

};

export const INITIAL_STATE : UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};


export const userReducer = (state = INITIAL_STATE, action: UnknownAction ) => {
  //const { type, payload } = action;

  // Typing correct switches
  if (signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload };   
  }

  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: null }; 
  }

  if (signInFailed.match(action) || signUpFailed.match(action) || signOutFailed.match(action)) {
    
    return { ...state, error: action.payload };
  }
      return state;
};
