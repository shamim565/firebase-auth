import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "your-firebase-api-key",
  authDomain: "react-app-973ce.firebaseapp.com",
  projectId: "react-app-973ce",
  storageBucket: "your-",
  messagingSenderId: "your-messagingSenderId",
  appId: "your-firebase",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
