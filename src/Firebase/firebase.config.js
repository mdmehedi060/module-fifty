// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAb6GqZS5x6-WfmXSFlDPuFpTZoSOBjiBQ",
  authDomain: "module-fifty-46b6e.firebaseapp.com",
  projectId: "module-fifty-46b6e",
  storageBucket: "module-fifty-46b6e.appspot.com",
  messagingSenderId: "1093932133860",
  appId: "1:1093932133860:web:2b6297690a8fe009ca6bf1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;
