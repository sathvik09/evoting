// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdQsk-SNlJEwNBtor3rOtKYrP93wfH76U",
  authDomain: "evoting-624e6.firebaseapp.com",
  projectId: "evoting-624e6",
  storageBucket: "evoting-624e6.appspot.com",
  messagingSenderId: "308669282241",
  appId: "1:308669282241:web:806512e69f31ef316fe140"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;