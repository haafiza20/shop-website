import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { getFirestore } from "firebase/firestore/lite";
import "firebase/compat/storage";

import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyD9_7-TcSFrQHm_f6zSen4wBQC_QCsIqvE",
  authDomain: "shop-app-v2-8f1ee.firebaseapp.com",
  projectId: "shop-app-v2-8f1ee",
  storageBucket: "shop-app-v2-8f1ee.appspot.com",
  messagingSenderId: "993977164660",
  appId: "1:993977164660:web:5d9e17975fbd7ef2e90221",
  measurementId: "G-9LTNG09RGG"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// const firestore = firebase.firestore();
const db = getFirestore(app);
const storageRef = firebase.storage().ref();

const storage = firebase.storage()

export { auth, provider, db, storageRef, storage };
