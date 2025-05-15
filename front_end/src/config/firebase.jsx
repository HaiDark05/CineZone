import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAqpo4bP5kJ3ALM2iQrZxhW1CixvPEKgvQ",
    authDomain: "moviesproject-16df3.firebaseapp.com",
    projectId: "moviesproject-16df3",
    storageBucket: "moviesproject-16df3.firebasestorage.app",
    messagingSenderId: "742245426018",
    appId: "1:742245426018:web:a9ba524fe6c47ef51cc23b",
    measurementId: "G-GEMSXLZXW5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();