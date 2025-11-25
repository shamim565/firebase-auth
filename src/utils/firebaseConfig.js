import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvOZ-FFpH06M2QT7FMSzxCVuYq1vQ1AhI",
  authDomain: "react-app-973ce.firebaseapp.com",
  projectId: "react-app-973ce",
  storageBucket: "react-app-973ce.firebasestorage.app",
  messagingSenderId: "937007554511",
  appId: "1:937007554511:web:903a6e6bbebf3942583cba",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
