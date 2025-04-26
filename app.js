// app.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPeFVgGZHJYSfgKho3z0FKnMZfBx4sjeA",
  authDomain: "fir-chat-app-66747.firebaseapp.com",
  projectId: "fir-chat-app-66747",
  storageBucket: "fir-chat-app-66747.appspot.com",
  messagingSenderId: "768757302927",
  appId: "1:768757302927:web:8ae5865d41442103f7d2fa",
  measurementId: "G-FFBZW106SW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log('Firebase Initialized');
