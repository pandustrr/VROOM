import { Alert } from 'react-native';
import { db } from './firebase'; 
import { 
    collection, 
    doc, 
    setDoc, 
    getDoc, 
    getDocs, 
    addDoc, 
    deleteDoc 
} from 'firebase/firestore'; 

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

// Mengambil data motor
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

// Mengambil data sepeda
export const ambilDataSepeda = async () => {
    try {
        // Referensi ke koleksi 'sepeda'
        const sepedaCollection = collection(db, 'sepeda');
        const sepedaSnapshot = await getDocs(sepedaCollection); // Mengambil semua dokumen dalam koleksi sepeda
        const sepedaList = sepedaSnapshot.docs.map((doc) => ({
            id: doc.id, // ID dokumen sebagai ID unik
            ...doc.data(), // Gabungkan data dari dokumen
        }));

        if (sepedaList.length > 0) {
            console.log('Data Sepeda:', sepedaList);
            return sepedaList; // Mengembalikan array data sepeda
        } else {
            console.warn('Dokumen sepeda tidak ditemukan');
            return [];
        }
    } catch (error) {
        console.error('Error saat mengambil data sepeda:', error.message);
        return [];
    }
};

export async function simpanDataPesanan(pesanan) {
    try {
        // Cek apakah email dan id kendaraan ada
        if (!pesanan.email || !pesanan.id) {
            throw new Error('Email pengguna dan ID kendaraan harus disertakan.');
        }

        // Cek status kendaraan sebelum menyimpan pesanan
        if (pesanan.status === 'tidak tersedia') {
            Alert.alert('Error', 'Kendaraan ini tidak tersedia untuk disewa.'); // Menampilkan alert jika kendaraan tidak tersedia
            return; // Menghentikan eksekusi fungsi dan tidak melanjutkan penyimpanan
        }

        // Rujuk ke koleksi Firestore untuk menyimpan pesanan
        const pesananRef = doc(db, 'pesanan_saya', pesanan.email); // Menggunakan email sebagai ID dokumen

        // Menyimpan data pesanan ke dalam dokumen pesanan_saya
        await setDoc(pesananRef, { 
            email: pesanan.email,
        });

        // Tambahkan item pesanan ke sub-koleksi 'items'
        const itemRef = collection(pesananRef, 'items');
        await addDoc(itemRef, {
            gambar: pesanan.gambar,
            harga: pesanan.harga,
            id: pesanan.id,
            nama: pesanan.nama,
            status: pesanan.status,
        });

        console.log('Pesanan berhasil disimpan:', pesanan);
    } catch (error) {
        console.error('Error saat menyimpan data pesanan:', error.message);
        throw error; // Lemparkan error untuk penanganan lebih lanjut
    }
}
