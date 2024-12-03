import { db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const simpanDataPengguna = async (email, dataPengguna) => {
    try {
        await setDoc(doc(db, 'akun', email), dataPengguna);
    } catch (error) {
        console.error("Error saat menyimpan data:", error.message);
    }
};


export const ambilDataPengguna = async (email) => {
        try {
            const docRef = doc(db, 'akun', email);
            const docSnap = await getDoc(docRef);
            
            // Log untuk memastikan kita mendapatkan data yang benar
            console.log("Data Pengguna:", docSnap.data());
            
            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                console.log("Dokumen tidak ditemukan!");
                return null;
            }
        } catch (error) {
            console.error("Error saat mengambil data:", error.message);
            return null;
        }
    };
    

