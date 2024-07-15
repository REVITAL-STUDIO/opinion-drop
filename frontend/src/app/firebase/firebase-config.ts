// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import "firebase/auth";
import firebase from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, Auth } from "firebase/auth";



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWDUro4CGt-EzIDxPmd-CYMd4oVUOf4v8",
  authDomain: "opinon-drop-auth.firebaseapp.com",
  projectId: "opinon-drop-auth",
  storageBucket: "opinon-drop-auth.appspot.com",
  messagingSenderId: "312439247775",
  appId: "1:312439247775:web:a4e28da78dabe781ffa3aa",
  measurementId: "G-6GXWFRE7DB"
};

let app: FirebaseApp | undefined;
let analytics: Analytics | undefined;
let auth: Auth | undefined;

export const initializeFirebase = () => {
  if (typeof window !== "undefined" && !app) {
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    auth = getAuth(app);
  }
};

export { auth};