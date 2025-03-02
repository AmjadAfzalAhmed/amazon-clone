import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7mOpMI39IRj7uUyjjW1COdPmIs2Cj5Os",
  authDomain: "clone-11136.firebaseapp.com",
  projectId: "clone-11136",
  storageBucket: "clone-11136.firebasestorage.app",
  messagingSenderId: "159221008437",
  appId: "1:159221008437:web:a175c62572b5b601b4097c"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
