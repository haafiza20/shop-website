import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { getFirestore } from "firebase/firestore/lite";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDG9TVNh4fPuAC8RfUvpy6TTSYtKxEfSgA",
  authDomain: "shopapp-a32a8.firebaseapp.com",
  projectId: "shopapp-a32a8",
  storageBucket: "shopapp-a32a8.appspot.com",
  messagingSenderId: "817674490643",
  appId: "1:817674490643:web:fe76f5b6f14fabb4be40e6",
  measurementId: "G-LN6Y2YLHJW"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// const firestore = firebase.firestore();
const db = getFirestore(app);
const storage = firebase.storage().ref();

export { auth, provider, db, storage };
