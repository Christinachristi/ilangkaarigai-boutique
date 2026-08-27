// src/app/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBVh5j2-Zg_QqxBHRcyQqQ_anzogWr4UDA",
  authDomain: "ilangkaarigai.firebaseapp.com",
  projectId: "ilangkaarigai",
  storageBucket: "ilangkaarigai.firebasestorage.app",
  messagingSenderId: "273925256374",
  appId: "1:273925256374:web:84be122252d498a7ce2217",
  measurementId: "G-4FNBZTV09L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Analytics browser environment-la mattum work aagura mathiri safe-ah initialize panrom
export let analytics: any = null;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});