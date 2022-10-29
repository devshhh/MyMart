// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxg3BHzR_5Ex6SSNlwpNLs0EnV1lM-zaI",
  authDomain: "mymart-451c8.firebaseapp.com",
  projectId: "mymart-451c8",
  storageBucket: "mymart-451c8.appspot.com",
  messagingSenderId: "632379111839",
  appId: "1:632379111839:web:02c2022da73e485b63e5aa",
  measurementId: "G-BDWDK3PHPQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db=getDatabase(app);
export const auth=getAuth();