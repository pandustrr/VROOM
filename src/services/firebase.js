// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database'; 

const firebaseConfig = {
    apiKey: "AIzaSyCwL2oeEzGnWN8zPT9G5bEGmraBs_qU1AU",
    authDomain: "vroom-d178a.firebaseapp.com",
    projectId: "vroom-d178a",
    storageBucket: "vroom-d178a.appspot.com",
    messagingSenderId: "725063017971",
    appId: "1:725063017971:web:b1d56b76d72048768f5e86",
    measurementId: "G-5P7Z2ML09H",
    databaseURL: "https://vroom-d178a-default-rtdb.firebaseio.com/"  
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app); 

const database = getDatabase(app);  

export { auth, db, database };
