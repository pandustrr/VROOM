import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCwL2oeEzGnWN8zPT9G5bEGmraBs_qU1AU",
    authDomain: "vroom-d178a.firebaseapp.com",
    projectId: "vroom-d178a",
    storageBucket: "vroom-d178a.appspot.com",
    messagingSenderId: "725063017971",
    appId: "1:725063017971:web:b1d56b76d72048768f5e86",
    measurementId: "G-5P7Z2ML09H"
};

// Inisialisasi aplikasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Authentication dan Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

