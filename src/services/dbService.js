import { db } from './firebase';
import { collection, doc, setDoc, getDoc, getDocs } from 'firebase/firestore'; // Pastikan mengimpor getDocs juga

// Fungsi untuk menyimpan data pengguna
export const simpanDataPengguna = async (email, dataPengguna) => {
    try {
        await setDoc(doc(db, 'akun', email), dataPengguna);
        console.log("Data pengguna berhasil disimpan:", dataPengguna);
    } catch (error) {
        console.error("Error saat menyimpan data:", error.message);
    }
};

// Fungsi untuk mengambil data pengguna
export const ambilDataPengguna = async (email) => {
    try {
        const docRef = doc(db, 'akun', email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Data Pengguna:", docSnap.data());
            return docSnap.data();
        } else {
            console.warn("Dokumen tidak ditemukan untuk email:", email);
            return null;
        }
    } catch (error) {
        console.error("Error saat mengambil data:", error.message);
        return null;
    }
};

// mengambil data motor
export const ambilDataMotor = async () => {
    try {
        const motorCollectionRef = collection(db, 'motor'); // Mengakses koleksi motor
        const motorSnapshot = await getDocs(motorCollectionRef); // Mengambil semua dokumen dalam koleksi motor
        const motorList = motorSnapshot.docs.map(doc => ({
            id: doc.id, // ID dokumen sebagai ID unik
            ...doc.data(), // Gabungkan data dari dokumen
        }));

        if (motorList.length > 0) {
            console.log("Data Motor:", motorList);
            return motorList; // Mengembalikan array data motor
        } else {
            console.warn("Dokumen motor tidak ditemukan");
            return [];
        }
    } catch (error) {
        console.error("Error saat mengambil data motor:", error.message);
        return [];
    }
};


// Mengambil data mobil
export const ambilDataMobil = async () => {
    try {
        // Referensi ke koleksi 'mobil'
        const mobilCollection = collection(db, 'mobil');
        const mobilSnapshot = await getDocs(mobilCollection);
        const mobilList = mobilSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        if (mobilList.length > 0) {
            console.log('Data Mobil:', mobilList);
            return mobilList;
        } else {
            console.warn('Dokumen mobil tidak ditemukan');
            return [];
        }
    } catch (error) {
        console.error('Error saat mengambil data mobil:', error.message);
        return [];
    }
};

