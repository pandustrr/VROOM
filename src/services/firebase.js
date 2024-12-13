// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';  // Import Realtime Database

const firebaseConfig = {
    apiKey: "AIzaSyCwL2oeEzGnWN8zPT9G5bEGmraBs_qU1AU",
    authDomain: "vroom-d178a.firebaseapp.com",
    projectId: "vroom-d178a",
    storageBucket: "vroom-d178a.appspot.com", // Perbaiki URL storage jika diperlukan
    messagingSenderId: "725063017971",
    appId: "1:725063017971:web:b1d56b76d72048768f5e86",
    measurementId: "G-5P7Z2ML09H",
    databaseURL: "https://vroom-d178a-default-rtdb.firebaseio.com/"  // Pastikan menambahkan URL untuk Realtime Database
};

// Inisialisasi aplikasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Auth, Firestore, dan Realtime Database
const auth = getAuth(app);
const db = getFirestore(app);  // Firestore digunakan untuk data
const database = getDatabase(app);  // Realtime Database

// Mengekspor auth, db, dan database untuk digunakan di file lain
export { auth, db, database };
