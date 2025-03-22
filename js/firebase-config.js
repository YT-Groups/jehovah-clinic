import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCYUjiAI_YjQfMkigfp7UpIudKUTUziXXQ",
  authDomain: "blog-responses-a7c88.firebaseapp.com",
  projectId: "blog-responses-a7c88",
  storageBucket: "blog-responses-a7c88.firebasestorage.app",
  messagingSenderId: "172061678785",
  appId: "1:172061678785:web:ef1d377a2ba2ba73bc8840",
  measurementId: "G-2BWRH50C1B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Make db available to other modules
export { db, collection, getDoc };
