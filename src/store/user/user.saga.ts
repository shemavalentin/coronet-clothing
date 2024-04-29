import { takeLatest, all, call, put } from "typed-redux-saga/macro";
import { User } from 'firebase/auth';
import { USER_ACTION_TYPES } from "./user.types";
import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signOutSuccess,
  signOutFailed,
  EmailSignInStart,
  SignUpStart,
  SignUpSuccess
} from "./user.action";

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
  AdditionalInformation
} from "../../utils/firebase/firebase.utils";

// Once we have the userAauth object, we need to create a snapshot fron db

export function* getSnapshotFromUserAuth(userAuth : User, additionalDetails?: AdditionalInformation) {
  try {
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );

    if (userSnapshot) {
      // pushing the ID in the reducer
      yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
      
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

// SignIn with Email&Password using Redux Saga
export function* signInWithGoogle() {
  try {
    //trigger the pop, then take that authentication object pull off the user which is userAuth
    // and run that trough the getSnapShot.
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

//Creating function to signIn with Email and Password
export function* signInWithEmail({ payload: { email, password }}:EmailSignInStart ) {
  try {
    const userCredential = yield* call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );

    if (userCredential) {
      const { user } = userCredential
      yield* call(getSnapshotFromUserAuth, user);
      
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

// setting up different entry sagas we  need here like the onCheckUser session,
export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

// SignUp function generator
export function* signUp({ payload: { email, password, displayName }}: SignUpStart) {
  try {
    const userCredential = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    // Performing a check to see if there are user credentials
    if (userCredential) {
      const { user } = userCredential;
      yield* put(signUpSuccess(user, { displayName }));     
    }


  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

// Creating signOut function generator

export function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signOutFailed(error as Error));
  }
}

// Breaking up and creating another function generator to trigger signIn after SignUp
export function* signInAfterSignUp({ payload: { user, additionalDetails } } : SignUpSuccess) {
  yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}

// Creating the entry point for email and password signIn or Google signIn
export function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

// Entry point for signin with email&password
export function* onEmailSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

// Entry point saga for signupStart

export function* onSignUpStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}
// Entry point for SignUpSuccess
export function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

// Entry onSignOutStart
export function* onSignOutStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

// Saga function
export function* UserSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
