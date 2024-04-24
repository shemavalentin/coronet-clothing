// Create action

// Injecting TypeScript

import { AnyAction } from "redux-saga"

export type ActionWithPayload<T, P> = {
    type: T;
    payload: P;
};

export type Action<T> = {
    type: T;
};


// TypeScript Function overloading to determine whether we have a payload or not.
// This will unable us to receive difference parameters as there will be the payload or not.
// Let's use classic functions

// Overloading
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;

// Typing a function if it is get called with the type cze we nned to pass back an action not with the payload if it is the case
export function createAction<T extends string>(Type: T, payload: void): Action<T>;

// Defining function implementation
export function createAction<T extends string, P>(type: T, payload: P) {
    return { type, payload }
}


