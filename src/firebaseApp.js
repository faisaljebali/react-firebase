import C from "./constants";
import * as firebase from "firebase";
import "firebase/firestore";

firebase.initializeApp(C.firebaseConfig);
export const auth = firebase.auth();
export const database = firebase.database();
export const firestore = firebase.firestore();
