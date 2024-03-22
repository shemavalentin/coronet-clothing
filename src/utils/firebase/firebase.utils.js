
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import {
  doc,
  getDoc,
  getFirestore,
  setDoc, 
  collection,
  writeBatch,
  query,
  getDocs
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

// Methode to create collection and at the same time the documents
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  
) => {
  const collectionRef = collection(db, collectionKey);
  // creating a successful transaction using a (Batch) to make sure that my all objects were sent to the collection successfully.
  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    const docRef = doc (collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);    
  });

  // Now firing off the bacth

  await batch.commit();
  console.log('Done Successfully!');

}

// Getting documents from firestore that are in form of object (Convoluted part of Firestore)

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');

  // a gotcha here, Creating a query by passing in collectionRef
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  // From here we are able to access the different snapshot off of query snapshot which gives an array
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
}



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
      console.log('Error creating the user', error.message);      
    }
  }

  // return userDocRef
  return userDocRef;  
}

// Authenticating user to the firebase and manage how the app interfaces with the external service (firebase) so that I'll be able to change in one place even though methods have been used in many places

// INterface for creating user to Firebase
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password)
    return;
  return await createUserWithEmailAndPassword(auth, email, password)
}

//Authenticating user Interface

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password)
    return;
  return await signInWithEmailAndPassword(auth, email, password)
}

// Interface for SigningOut the user 
export const signOutUser = async () => await signOut(auth);

// Creating a helper function for Observer Listener pettern
// It is an observer listerner
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
