// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRAFZ8-vJdIhOhkVYiDJQzjPZ6fo-NNBY",
  authDomain: "sparkplug-12f9b.firebaseapp.com",
  projectId: "sparkplug-12f9b",
  storageBucket: "sparkplug-12f9b.appspot.com",
  messagingSenderId: "724367591862",
  appId: "1:724367591862:web:77fd7db3478294ccccd917",
  measurementId: "G-C2GN8E9QSM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
