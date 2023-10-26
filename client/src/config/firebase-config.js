// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKpfL3aEnnaFd7aOVQdodjodhao02j9_Y",
  authDomain: "jasmin-44c9d.firebaseapp.com",
  projectId: "jasmin-44c9d",
  storageBucket: "jasmin-44c9d.appspot.com",
  messagingSenderId: "40211231284",
  appId: "1:40211231284:web:a982a5eb5e06faf4081061",
  measurementId: "G-PT07MX9X9E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);