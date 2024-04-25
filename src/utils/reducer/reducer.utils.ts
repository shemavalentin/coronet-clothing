// Create action

// Injecting TypeScript

import { AnyAction } from "redux-saga"

//Creating matchable type  (AC: Action Creator)
type Matchable<AC extends () => AnyAction> = AC & {
    type: ReturnType<AC>['type'];
    match(action: AnyAction): action is ReturnType<AC>;
}

// Matcher utility function that receives some action creator in order to create a new matchable type out of the above action creator.
// These are also Types overloading 

export function withMatcher<AC extends () => AnyAction & {
    type: string
}>(actionCreator: AC): Matchable<AC>;

export function withMatcher<AC extends (...args: any[]) => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>

export function withMatcher(actionCreator: Function) {
    // returning action and assign to a varialbe
    const type = actionCreator().type;
    
    // creating a actual mappable object

    return Object.assign(actionCreator, {
        type,
        match(action: AnyAction) {
            return action.type === type;
        }
    })        
}

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


