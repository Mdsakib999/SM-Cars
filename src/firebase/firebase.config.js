// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9ebHSVXG1FtCdFPSMP_ypxiyiqMg5sn8",
  authDomain: "smcars-68d54.firebaseapp.com",
  projectId: "smcars-68d54",
  storageBucket: "smcars-68d54.firebasestorage.app",
  messagingSenderId: "139742967707",
  appId: "1:139742967707:web:b79c26962ccc149446133e",
  measurementId: "G-RX9CXVF8FZ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
