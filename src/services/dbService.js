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
            return motorList; 
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
        const sepedaCollectionRef = collection(db, 'sepeda'); 
        const sepedaSnapshot = await getDocs(sepedaCollectionRef); 
        const sepedaList = sepedaSnapshot.docs.map(doc => ({
            id: doc.id, 
            ...doc.data(), 
        }));

        if (sepedaList.length > 0) {
            console.log("Data Sepeda:", sepedaList);
            return sepedaList; 
        } else {
            console.warn("Dokumen sepeda tidak ditemukan");
            return [];
        }
    } catch (error) {
        console.error("Error saat mengambil data sepeda:", error.message);
        return [];
    }
};

export async function simpanDataPesananMobil(pesanan) {
    try {
        if (!pesanan.email || !pesanan.id) {
            throw new Error("Email pengguna dan ID mobil harus disertakan.");
        }

        if (pesanan.status === "tidak tersedia") {
            Alert.alert("Error", "Mobil ini tidak tersedia untuk disewa.");
            return;
        }

        const idPesananBaru = await getNextPesananId(pesanan.email);

        const pesananRef = doc(db, "pesanan_saya", pesanan.email);

        await setDoc(pesananRef, {
            email: pesanan.email,
        }, { merge: true });

        const itemRef = collection(pesananRef, "items");
        await addDoc(itemRef, {
            idPesanan: idPesananBaru,
            gambar: pesanan.gambar,
            harga: pesanan.harga,
            id: pesanan.id,
            nama: pesanan.nama,
            status: pesanan.status,
            namaPenyewa: pesanan.namaPenyewa,
            tanggalPemesanan: pesanan.tanggalPemesanan,
            hariPenyewaan: pesanan.hariPenyewaan,
            totalHarga: pesanan.totalHarga,
        });

        console.log("Pesanan mobil berhasil disimpan:", pesanan);
    } catch (error) {
        console.error("Error saat menyimpan data pesanan mobil:", error.message);
        throw error;
    }
}

export async function simpanDataPesananMotor(pesanan) {
    try {
        if (!pesanan.email || !pesanan.id) {
            throw new Error("Email pengguna dan ID motor harus disertakan.");
        }

        if (pesanan.status === "tidak tersedia") {
            Alert.alert("Error", "Motor ini tidak tersedia untuk disewa.");
            return;
        }

        const idPesananBaru = await getNextPesananId(pesanan.email);

        const pesananRef = doc(db, "pesanan_saya", pesanan.email);

        await setDoc(pesananRef, {
            email: pesanan.email,
        }, { merge: true });

        const itemRef = collection(pesananRef, "items");
        await addDoc(itemRef, {
            idPesanan: idPesananBaru,
            gambar: pesanan.gambar,
            harga: pesanan.harga,
            id: pesanan.id,
            nama: pesanan.nama,
            status: pesanan.status,
            namaPenyewa: pesanan.namaPenyewa,
            tanggalPemesanan: pesanan.tanggalPemesanan,
            hariPenyewaan: pesanan.hariPenyewaan,
            totalHarga: pesanan.totalHarga,
        });

        console.log("Pesanan motor berhasil disimpan:", pesanan);
    } catch (error) {
        console.error("Error saat menyimpan data pesanan motor:", error.message);
        throw error;  
    }
}

export async function simpanDataPesananSepeda(pesanan) {
    try {
        if (!pesanan.email || !pesanan.id) {
            throw new Error("Email pengguna dan ID sepeda harus disertakan.");
        }

        if (pesanan.status === "tidak tersedia") {
            Alert.alert("Error", "Sepeda ini tidak tersedia untuk disewa.");
            return;
        }

        const idPesananBaru = await getNextPesananId(pesanan.email);

        const pesananRef = doc(db, "pesanan_saya", pesanan.email);

        // Menyimpan atau memperbarui data pesanan pengguna
        await setDoc(pesananRef, {
            email: pesanan.email,
        }, { merge: true });

        const itemRef = collection(pesananRef, "items");
        await addDoc(itemRef, {
            idPesanan: idPesananBaru,
            gambar: pesanan.gambar,
            harga: pesanan.harga,
            id: pesanan.id,
            nama: pesanan.nama,
            status: pesanan.status,
            namaPenyewa: pesanan.namaPenyewa,
            tanggalPemesanan: pesanan.tanggalPemesanan,
            hariPenyewaan: pesanan.hariPenyewaan,
            totalHarga: pesanan.totalHarga,
        });

        console.log("Pesanan sepeda berhasil disimpan:", pesanan);
    } catch (error) {
        console.error("Error saat menyimpan data pesanan sepeda:", error.message);
        throw error;  
    }
}

async function getNextPesananId(email) {
    try {
        const itemsCollection = collection(doc(db, "pesanan_saya", email), "items");
        const snapshot = await getDocs(itemsCollection);

        return snapshot.size + 1;
    } catch (error) {
        console.error("Error saat mendapatkan ID pesanan baru:", error.message);
        throw error;
    }
}


export async function bacaPesanan(email) {
    try {
        const itemsRef = collection(db, "pesanan_saya", email, "items");

        const querySnapshot = await getDocs(itemsRef);

        const pesananList = querySnapshot.docs.map(doc => ({
            id: doc.id, 
            ...doc.data(), 
        }));

        console.log("Daftar pesanan:", pesananList); 
        return pesananList;
    } catch (error) {
        console.error("Error saat membaca data pesanan:", error.message);
        throw error;
    }
}


