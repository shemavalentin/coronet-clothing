
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import {
  doc,
  getDoc,
  getFirestore,
  setDoc
} from 'firebase/firestore'


// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "Put your own keys",
  authDomain: "coronet-clothing-db-5fcd9.firebaseapp.com",
  projectId: "coronet-clothing-db-5fcd9",
  storageBucket: "coronet-clothing-db-5fcd9.appspot.com",
  messagingSenderId: "406449512496",
  appId: "1:406449512496:web:e741fb7bc31a2e1b29cdf5"
};

// Initialize Firebase
   
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: " select_account"

});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Creating db

export const db = getFirestore();

// Method to take data from authentication and store that inside the firestore.
export const creactUserDocumentFromAuth = async (userAuth) => {
  //Check first if there is a document referance

  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  //The snapshot allows us to check whether the document exist and access the data.
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  // if user data does not exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt

      });

    } catch (error) {
      console.log('error creating the user', error.message);
      
    }
  }

  return userDocRef;

    // create/ set the document with the data from userAuth in my collection
    
    // Checking if user data exists in a document

    // 


    // return userDocRef
}