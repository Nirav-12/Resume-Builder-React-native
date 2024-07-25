// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLLS4iADrVptgN7u90egYit2R6Rdozbqg",
  authDomain: "news-analytics-808f1.firebaseapp.com",
  projectId: "news-analytics-808f1",
  storageBucket: "news-analytics-808f1.appspot.com",
  messagingSenderId: "907954972855",
  appId: "1:907954972855:web:03b914d1cfc3a8f8b8c532",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
