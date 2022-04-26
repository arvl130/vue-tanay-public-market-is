// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCm7gDkFZrsh7NRYuy7N6IHEI9GOAl97VE",
  authDomain: "rentie-tanay.firebaseapp.com",
  projectId: "rentie-tanay",
  storageBucket: "rentie-tanay.appspot.com",
  messagingSenderId: "693447729288",
  appId: "1:693447729288:web:03834ecf8602d212c8ff3d",
  measurementId: "G-DTKY4WCDY4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
