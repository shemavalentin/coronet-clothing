
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';


import {
  doc,
  getDoc,
  getFirestore,
  setDoc
} from 'firebase/firestore'

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTo_edmjHo1CXrHA0_HdiQrA71-j6FQEI",
  authDomain: "coronet-clothing-db-5fcd9.firebaseapp.com",
  projectId: "coronet-clothing-db-5fcd9",
  storageBucket: "coronet-clothing-db-5fcd9.appspot.com",
  messagingSenderId: "406449512496",
  appId: "1:406449512496:web:e741fb7bc31a2e1b29cdf5"
};

// Initialize Firebase
   
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: " select_account"

});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// Creating db
export const db = getFirestore();

// Method to take data from authentication and store that inside the firestore.
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  //Check first if there is a document referance
  const userDocRef = doc(db, 'users', userAuth.uid);
  
  //The snapshot allows us to check whether the document exist and access the data.
  const userSnapshot = await getDoc(userDocRef);
 
   // if user data does not exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation

      });

    } catch (error) {
      console.log('error creating the user', error.message);
      
    }
  }

  // return userDocRef
  return userDocRef;  
}

// Authenticating user to the firebase and manage how the app interfaces with the external service (firebase) so that I'll be able to change in one place even though methods have been used in many places

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password)
    return;
  return await createUserWithEmailAndPassword(auth, email, password)
}