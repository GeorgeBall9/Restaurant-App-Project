// imports
import {initializeApp} from "firebase/app";

// db imports
import {getFirestore, doc, getDoc, setDoc} from "firebase/firestore";

// auth imports
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup
} from "firebase/auth";

// firebase config
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// initialise app
const app = initializeApp(firebaseConfig);

// initialise firestore database
const db = getFirestore(app);

// auth functions
const auth = getAuth();

// create authenticated user from email and password after sign up
export const createAuthUserFromEmailAndPassword = async (email, password) => {
};

// sign in authenticated user from email and password after sign in
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
};

// sign in with Google popup
const googleAuthProvider = new GoogleAuthProvider();

export const signInWithGooglePopup = async () => {
    const result = await signInWithPopup(auth, googleAuthProvider);
    return result.user;
};

// sign in with Facebook popup
const facebookAuthProvider = new FacebookAuthProvider();

export const signInWithFacebookPopup = async () => {
    const result = await signInWithPopup(auth, facebookAuthProvider);
    return result.user;
};

// sign up with email and password
export const signUpAuthUserWithEmailAndPassword = async (email, password) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    return credential.user;
};

// database functions

// check if user doc already exists
export const userDocExists = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
};

// create user doc - userData param includes displayName, email
export const createUserDoc = async (userData, userId) => {
    const userDocRef = doc(db, "users", userId);

    await setDoc(userDocRef, {...userData}, {merge: true});

    console.log("User document written with ID: ", userDocRef.id);
};
