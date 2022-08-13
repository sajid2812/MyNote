import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "mynote-89bf5.firebaseapp.com",
  projectId: "mynote-89bf5",
  storageBucket: "mynote-89bf5.appspot.com",
  messagingSenderId: "748433397869",
  appId: "1:748433397869:web:7c67241da9379e3060c764",
  measurementId: "G-5LZ93TCND1",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage(firebaseApp);

export { db, storage };
