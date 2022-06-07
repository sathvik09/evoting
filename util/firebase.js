// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsN2iJTVnU9Ewn6UX8s34HJtzdRlzTJpE",
  authDomain: "votingapp-553ee.firebaseapp.com",
  databaseURL: "https://votingapp-553ee-default-rtdb.firebaseio.com",
  projectId: "votingapp-553ee",
  storageBucket: "votingapp-553ee.appspot.com",
  messagingSenderId: "1059065936044",
  appId: "1:1059065936044:web:b23c432d4db112cba40709"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;