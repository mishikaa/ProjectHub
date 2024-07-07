// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5nmvBrc3o5DzB1U6zo3kXvnKtw8HlX0c",
  authDomain: "projecthub-1b710.firebaseapp.com",
  projectId: "projecthub-1b710",
  storageBucket: "projecthub-1b710.appspot.com",
  messagingSenderId: "735397157169",
  appId: "1:735397157169:web:d1f669e37f560d5502f810",
  measurementId: "G-CHPW97K56W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);