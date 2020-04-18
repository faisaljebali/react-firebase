import * as firebase from "firebase";
import C from "../constants";
import { auth,firestore } from "../firebaseApp";

/*
* Listen Auth
*/

export const listenToAuth = () => (dispatch, getState) => {
  localStorage.removeItem('username');
  auth.onAuthStateChanged(authData => {
    if (authData) {
      auth.onAuthStateChanged(async userAuth => {
        if(userAuth){
        const user = await generateUserDocument(userAuth);
        if(user){
          var obj = JSON.stringify(user);
          console.log('User connect is :',obj);
          localStorage.setItem('username', obj);
          
          dispatch({
            type: C.AUTH_LOGIN,
            uid: user.uid,
            username: user.fullname
          });
        }
        }else{
          localStorage.removeItem('username');
        }
      });
    } else {
      if (getState().auth.status !== C.AUTH_ANONYMOUS) {
        localStorage.removeItem('username');
        dispatch({ type: C.AUTH_LOGOUT });
      }
    }
  });
};

/*
* Login with Google
*/

export const openAuth = () => dispatch => {
  dispatch({ type: C.AUTH_OPEN });
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).catch(error => {
    dispatch({
      type: C.FEEDBACK_DISPLAY_ERROR,
      error: `${error}`
    });
    dispatch({ type: C.AUTH_LOGOUT });
  });
};

/*
* Login with Email and Password
*/

export const loginAuth = (email, password) => dispatch => {
  dispatch({ type: C.AUTH_OPEN });
  auth.signInWithEmailAndPassword(email, password).catch(error => {
    dispatch({
      type: C.FEEDBACK_DISPLAY_ERROR,
      error: `${error.message}`
    });
    dispatch({ type: C.AUTH_LOGOUT });
      console.error("Error signing in with password and email", error);
    });
};

/*
* Register with Email
*/

export const  registerAuth =  (email, password,fulname) => async dispatch => {
  dispatch({ type: C.AUTH_OPEN });
  try{
    const {user} = await auth.createUserWithEmailAndPassword(email, password);
    generateUserDocument(user, fulname);
  }
  catch(error){
    dispatch({
      type: C.FEEDBACK_DISPLAY_ERROR,
      error: `${error}`
    });
    dispatch({ type: C.AUTH_LOGOUT });
    console.log('Error Signing up with email and password');
  }

};

/*
* Logout User
*/

export const logoutUser = () => dispatch => {
  localStorage.removeItem('username');
  dispatch({ type: C.AUTH_LOGOUT });
  auth.signOut();
};


/*
* Reset Password
*/

export const resetPass = (email) => async dispatch => {
  
  const docRef = await firestore.collection("users").where("email", "==", email).get()
  .then(function(doc) {
      if (doc && doc.docs[0] && doc.docs[0].exists) {
          auth.sendPasswordResetEmail(email);
          dispatch({
            type: C.FEEDBACK_DISPLAY_MESSAGE,
            message: "Email Sent"
          });
      } else {
          // doc.data() will be undefined in this case
          dispatch({
            type: C.FEEDBACK_DISPLAY_ERROR,
            error: `User not found`
          });
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });

};

/*
* Function
*/

const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  //console.log(additionalData);
  //console.log(user);
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email,displayName,photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        fullname: additionalData
      });
    } catch (error) {
      //console.error("Error creating user document", error);
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
