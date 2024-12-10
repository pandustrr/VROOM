import { Alert } from 'react-native';
import { db } from './firebase'; 
import { 
    collection, 
    doc, 
    setDoc, 
    getDoc, 
    getDocs, 
    addDoc, 
    deleteDoc,
    getFirestore
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
        const motorCollectionRef = collection(db, 'motor'); 
        const motorSnapshot = await getDocs(motorCollectionRef); 
        const motorList = motorSnapshot.docs.map(doc => ({
            id: doc.id, 
            ...doc.data(), 
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

// Fungsi untuk menyimpan data pesanan mobil
export async function simpanDataPesananMobil(pesanan) {
    try {
        if (!pesanan.email || !pesanan.id) {
            throw new Error("Email pengguna dan ID mobil harus disertakan.");
        }

        // Cek status mobil sebelum menyimpan pesanan
        if (pesanan.status === "tidak tersedia") {
            Alert.alert("Error", "Mobil ini tidak tersedia untuk disewa.");
            return;
        }

        // Dapatkan ID pesanan baru
        const idPesananBaru = await getNextPesananId(pesanan.email);

        // Rujuk ke koleksi Firestore untuk menyimpan pesanan mobil
        const pesananRef = doc(db, "pesanan_saya", pesanan.email);

        // Menyimpan data pesanan ke dalam dokumen pesanan_saya
        await setDoc(pesananRef, {
            email: pesanan.email,
        }, { merge: true });

        // Tambahkan item pesanan ke sub-koleksi 'items'
        const itemRef = collection(pesananRef, "items");
        await addDoc(itemRef, {
            idPesanan: idPesananBaru, // Tambahkan ID pesanan baru
            gambar: pesanan.gambar,
            harga: pesanan.harga,
            id: pesanan.id,
            nama: pesanan.nama,
            status: pesanan.status,
        });

        console.log("Pesanan mobil berhasil disimpan:", pesanan);
    } catch (error) {
        console.error("Error saat menyimpan data pesanan mobil:", error.message);
        throw error;
    }
}

// Fungsi untuk menyimpan data pesanan motor
export async function simpanDataPesananMotor(pesanan) {
    try {
        if (!pesanan.email || !pesanan.id) {
            throw new Error("Email pengguna dan ID motor harus disertakan.");
        }

        // Cek status motor sebelum menyimpan pesanan
        if (pesanan.status === "tidak tersedia") {
            Alert.alert("Error", "Motor ini tidak tersedia untuk disewa.");
            return;
        }

        // Dapatkan ID pesanan baru
        const idPesananBaru = await getNextPesananId(pesanan.email);

        // Rujuk ke koleksi Firestore untuk menyimpan pesanan motor
        const pesananRef = doc(db, "pesanan_saya", pesanan.email);

        // Menyimpan data pesanan ke dalam dokumen pesanan_saya
        await setDoc(pesananRef, {
            email: pesanan.email,
        }, { merge: true });

        // Tambahkan item pesanan ke sub-koleksi 'items'
        const itemRef = collection(pesananRef, "items");
        await addDoc(itemRef, {
            idPesanan: idPesananBaru, // Tambahkan ID pesanan baru
            gambar: pesanan.gambar,
            harga: pesanan.harga,
            id: pesanan.id,
            nama: pesanan.nama,
            status: pesanan.status,
        });

        console.log("Pesanan motor berhasil disimpan:", pesanan);
    } catch (error) {
        console.error("Error saat menyimpan data pesanan motor:", error.message);
        throw error;
    }
}

// Fungsi untuk menyimpan data pesanan sepeda
export async function simpanDataPesananSepeda(pesanan) {
    try {
        if (!pesanan.email || !pesanan.id) {
            throw new Error("Email pengguna dan ID sepeda harus disertakan.");
        }

        // Cek status sepeda sebelum menyimpan pesanan
        if (pesanan.status === "tidak tersedia") {
            Alert.alert("Error", "Sepeda ini tidak tersedia untuk disewa.");
            return;
        }

        // Dapatkan ID pesanan baru
        const idPesananBaru = await getNextPesananId(pesanan.email);

        // Rujuk ke koleksi Firestore untuk menyimpan pesanan sepeda
        const pesananRef = doc(db, "pesanan_saya", pesanan.email);

        // Menyimpan data pesanan ke dalam dokumen pesanan_saya
        await setDoc(pesananRef, {
            email: pesanan.email,
        }, { merge: true });

        // Tambahkan item pesanan ke sub-koleksi 'items'
        const itemRef = collection(pesananRef, "items");
        await addDoc(itemRef, {
            idPesanan: idPesananBaru, 
            gambar: pesanan.gambar,
            harga: pesanan.harga,
            id: pesanan.id,
            nama: pesanan.nama,
            status: pesanan.status,
        });

        console.log("Pesanan sepeda berhasil disimpan:", pesanan);
    } catch (error) {
        console.error("Error saat menyimpan data pesanan sepeda:", error.message);
        throw error;
    }
}

// Fungsi untuk mendapatkan ID pesanan baru
async function getNextPesananId(email) {
    try {
        // Rujuk ke sub-koleksi 'items' milik pengguna
        const itemsCollection = collection(doc(db, "pesanan_saya", email), "items");
        const snapshot = await getDocs(itemsCollection);

        // ID pesanan baru adalah jumlah dokumen yang ada + 1
        return snapshot.size + 1;
    } catch (error) {
        console.error("Error saat mendapatkan ID pesanan baru:", error.message);
        throw error;
    }
}


export async function bacaPesanan(email) {
    try {
        // Referensi ke sub-koleksi 'items' di dalam 'pesanan_saya/{email}'
        const itemsRef = collection(db, "pesanan_saya", email, "items");

        // Ambil semua dokumen dari sub-koleksi 'items'
        const querySnapshot = await getDocs(itemsRef);

        // Transformasikan data ke dalam array
        const pesananList = querySnapshot.docs.map(doc => ({
            id: doc.id, // ID dokumen
            ...doc.data(), // Data pesanan
        }));

        console.log("Daftar pesanan:", pesananList); // Debug log
        return pesananList;
    } catch (error) {
        console.error("Error saat membaca data pesanan:", error.message);
        throw error;
    }
}


