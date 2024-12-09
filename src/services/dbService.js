import { Alert } from 'react-native';
import { db } from './firebase'; 
import { 
    collection, 
    doc, 
    setDoc, 
    getDoc, 
    getDocs, 
    addDoc, 
    query,
    increment,
    deleteDoc 
} from 'firebase/firestore'; 
import { auth } from '../services/firebase';  // Import auth dari firebaseConfig untuk mengambil data pengguna



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

export const ambilDataSepeda = async () => {
    try {
        const sepedaCollectionRef = collection(db, 'sepeda'); // Mengakses koleksi sepeda
        const sepedaSnapshot = await getDocs(sepedaCollectionRef); // Mengambil semua dokumen dalam koleksi sepeda
        const sepedaList = sepedaSnapshot.docs.map(doc => ({
            id: doc.id, // ID dokumen sebagai ID unik
            ...doc.data(), // Gabungkan data dari dokumen
        }));

        if (sepedaList.length > 0) {
            console.log("Data Sepeda:", sepedaList);
            return sepedaList; // Mengembalikan array data sepeda
        } else {
            console.warn("Dokumen sepeda tidak ditemukan");
            return [];
        }
    } catch (error) {
        console.error("Error saat mengambil data sepeda:", error.message);
        return [];
    }
};

// export async function simpanDataPesananMobil(pesanan) {
//     try {
//         if (!pesanan.email || !pesanan.id) {
//             throw new Error('Email pengguna dan ID kendaraan harus disertakan.');
//         }

//         // Cek status kendaraan sebelum menyimpan pesanan
//         if (pesanan.status === 'tidak tersedia') {
//             Alert.alert('Error', 'Kendaraan ini tidak tersedia untuk disewa.'); 
//             return; 
//         }

//         // Rujuk ke koleksi Firestore untuk menyimpan pesanan
//         const pesananRef = doc(db, 'pesanan_saya', pesanan.email); // Menggunakan email sebagai ID dokumen

//         // Menyimpan data pesanan ke dalam dokumen pesanan_saya
//         await setDoc(pesananRef, { 
//             email: pesanan.email,
//         });

//         // Tambahkan item pesanan ke sub-koleksi 'items'
//         const itemRef = collection(pesananRef, 'items');
//         await addDoc(itemRef, {
//             gambar: pesanan.gambar,
//             harga: pesanan.harga,
//             id: pesanan.id,
//             nama: pesanan.nama,
//             status: pesanan.status,
//         });

//         console.log('Pesanan berhasil disimpan:', pesanan);
//     } catch (error) {
//         console.error('Error saat menyimpan data pesanan:', error.message);
//         throw error; 
//     }
// }

// export async function simpanDataPesananMotor(pesanan) {
//     try {
//         // Cek apakah email dan id motor ada
//         if (!pesanan.email || !pesanan.id) {
//             throw new Error('Email pengguna dan ID motor harus disertakan.');
//         }

//         // Cek status motor sebelum menyimpan pesanan
//         if (pesanan.status === 'tidak tersedia') {
//             Alert.alert('Error', 'Motor ini tidak tersedia untuk disewa.');
//             return;
//         }

//         // Rujuk ke koleksi Firestore untuk menyimpan pesanan motor
//         const pesananRef = doc(db, 'pesanan_saya', pesanan.email); // Menggunakan email sebagai ID dokumen

//         // Menyimpan data pesanan ke dalam dokumen pesanan_saya
//         await setDoc(pesananRef, { 
//             email: pesanan.email,
//         });

//         // Tambahkan item pesanan ke sub-koleksi 'items'
//         const itemRef = collection(pesananRef, 'items');
//         await addDoc(itemRef, {
//             gambar: pesanan.gambar,
//             harga: pesanan.harga,
//             id: pesanan.id,
//             nama: pesanan.nama,
//             status: pesanan.status,
//         });

//         console.log('Pesanan motor berhasil disimpan:', pesanan);
//     } catch (error) {
//         console.error('Error saat menyimpan data pesanan motor:', error.message);
//         throw error; 
//     }
// }

// export async function simpanDataPesananSepeda(pesanan) {
//     try {
//         // Cek apakah email dan id sepeda ada
//         if (!pesanan.email || !pesanan.id) {
//             throw new Error('Email pengguna dan ID sepeda harus disertakan.');
//         }

//         // Cek status sepeda sebelum menyimpan pesanan
//         if (pesanan.status === 'tidak tersedia') {
//             Alert.alert('Error', 'Sepeda ini tidak tersedia untuk disewa.');
//             return;
//         }

//         // Rujuk ke koleksi Firestore untuk menyimpan pesanan sepeda
//         const pesananRef = doc(db, 'pesanan_saya', pesanan.email); // Menggunakan email sebagai ID dokumen

//         // Menyimpan data pesanan ke dalam dokumen pesanan_saya
//         await setDoc(pesananRef, { 
//             email: pesanan.email,
//         });

//         // Tambahkan item pesanan ke sub-koleksi 'items'
//         const itemRef = collection(pesananRef, 'items');
//         await addDoc(itemRef, {
//             gambar: pesanan.gambar,
//             harga: pesanan.harga,
//             id: pesanan.id,
//             nama: pesanan.nama,
//             status: pesanan.status,
//         });

//         console.log('Pesanan sepeda berhasil disimpan:', pesanan);
//     } catch (error) {
//         console.error('Error saat menyimpan data pesanan sepeda:', error.message);
//         throw error; 
//     }
// }
// Fungsi untuk menyimpan data pesanan mobil
export async function simpanDataPesananMobil(pesanan) {
    try {
        if (!pesanan.email || !pesanan.id) {
            throw new Error('Email pengguna dan ID mobil harus disertakan.');
        }

        // Cek status mobil sebelum menyimpan pesanan
        if (pesanan.status === 'tidak tersedia') {
            Alert.alert('Error', 'Mobil ini tidak tersedia untuk disewa.');
            return;
        }

        // Rujuk ke koleksi Firestore untuk menyimpan pesanan mobil
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

        console.log('Pesanan mobil berhasil disimpan:', pesanan);
    } catch (error) {
        console.error('Error saat menyimpan data pesanan mobil:', error.message);
        throw error; 
    }
}

export async function simpanDataPesananMotor(pesanan) {
    try {
        if (!pesanan.email || !pesanan.id) {
            throw new Error('Email pengguna dan ID motor harus disertakan.');
        }

        // Cek status motor sebelum menyimpan pesanan
        if (pesanan.status === 'tidak tersedia') {
            Alert.alert('Error', 'Motor ini tidak tersedia untuk disewa.');
            return;
        }

        // Rujuk ke koleksi Firestore untuk menyimpan pesanan motor
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

        console.log('Pesanan motor berhasil disimpan:', pesanan);
    } catch (error) {
        console.error('Error saat menyimpan data pesanan motor:', error.message);
        throw error; 
    }
}


  // Fungsi untuk menyimpan data pesanan sepeda
    export async function simpanDataPesananSepeda(pesanan) {
    try {
        if (!pesanan.email || !pesanan.id) {
            throw new Error('Email pengguna dan ID sepeda harus disertakan.');
        }

        // Cek status sepeda sebelum menyimpan pesanan
        if (pesanan.status === 'tidak tersedia') {
            Alert.alert('Error', 'Sepeda ini tidak tersedia untuk disewa.');
            return;
        }

        // Rujuk ke koleksi Firestore untuk menyimpan pesanan sepeda
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

        console.log('Pesanan sepeda berhasil disimpan:', pesanan);
    } catch (error) {
        console.error('Error saat menyimpan data pesanan sepeda:', error.message);
        throw error; 
    }
}

// Fungsi untuk mengambil data pesanan berdasarkan email pengguna
export async function ambilDataPesanan(email) {
    try {
        const pesananRef = doc(db, 'pesanan_saya', email);
        const itemRef = collection(pesananRef, 'items');

        const q = query(itemRef);
        const querySnapshot = await getDocs(q);
        const pesananList = [];

        querySnapshot.forEach((doc) => {
            pesananList.push(doc.data());
        });

        return pesananList;
    } catch (error) {
        console.error('Error saat mengambil data pesanan:', error);
        throw error;
    }
}