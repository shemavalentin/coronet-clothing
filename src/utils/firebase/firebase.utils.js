
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';


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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: " select_account"

});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);