import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { functions } from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDfxcSBt64XUsIt8EgX_aYjjanCEp-jDIo",
  authDomain: "app-netlify-faisal.firebaseapp.com",
  databaseURL: "https://app-netlify-faisal.firebaseio.com",
  projectId: "app-netlify-faisal",
  storageBucket: "app-netlify-faisal.appspot.com",
  messagingSenderId: "93566354677",
  appId: "1:93566354677:web:3a1eb75fcceb2cbce171bc",
  measurementId: "G-9S0TJNQEZK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};