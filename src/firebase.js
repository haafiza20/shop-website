import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { getFirestore } from "firebase/firestore/lite";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB41g_5Re22wYUL4f_VtwqFuLLUeBmpV1o",
  authDomain: "shopping-app-54448.firebaseapp.com",
  projectId: "shopping-app-54448",
  storageBucket: "shopping-app-54448.appspot.com",
  messagingSenderId: "898796623095",
  appId: "1:898796623095:web:4de4ea28b98ca8aa52aff2",
  measurementId: "G-6S2015XGE2"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// const firestore = firebase.firestore();
const db = getFirestore(app);
const storage = firebase.storage().ref();

export { auth, provider, db, storage };
