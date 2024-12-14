import { Alert } from 'react-native';
import { db } from './firebase'; 
import { 
    collection, 
    doc, 
    setDoc, 
    getDoc, 
    getDocs, 
    updateDoc,
    addDoc, 
    deleteDoc,
    getFirestore
} from 'firebase/firestore'; 
import { firestore } from './firebase';  // Pastikan ini mengimpor firestore dari file konfigurasi Firebase Anda
import { getAuth } from 'firebase/auth';



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
        if (!pesanan.email || !pesanan.items || !pesanan.namaPenyewa) {
            throw new Error("Email, nama penyewa, dan daftar item harus disertakan.");
        }

        // Validasi setiap item mobil
        pesanan.items.forEach(item => {
            if (item.status === "tidak tersedia") {
                throw new Error(`Mobil ${item.nama} tidak tersedia untuk disewa.`);
            }
        });

        // Buat ID pesanan baru
        const idPesananBaru = `pesanan_${Date.now()}`;

        // Referensi dokumen pesanan baru
        const pesananRef = doc(db, "pesanan", idPesananBaru);

        // Hitung total harga pesanan
        const totalHargaPesanan = pesanan.items.reduce((total, item) => total + item.totalHarga, 0);

        // Simpan data pesanan ke Firestore
        await setDoc(pesananRef, {
            email: pesanan.email,
            tanggalPemesanan: pesanan.tanggalPemesanan || new Date().toISOString().split('T')[0],
            items: pesanan.items,
            statusPembayaran: pesanan.statusPembayaran || "Belum dibayar",
            namaPenyewa: pesanan.namaPenyewa,
            totalHargaPesanan
        });

        console.log("Pesanan mobil berhasil disimpan:", pesanan);
    } catch (error) {
        console.error("Error saat menyimpan data pesanan mobil:", error.message);
        Alert.alert("Error", error.message);
        throw error;
    }
}

export async function simpanDataPesananMotor(pesanan) {
    try {
        if (!pesanan.email || !pesanan.items || !pesanan.namaPenyewa) {
            throw new Error("Email, nama penyewa, dan daftar item harus disertakan.");
        }

        // Validasi setiap item motor
        pesanan.items.forEach(item => {
            if (item.status === "tidak tersedia") {
                throw new Error(`Motor ${item.nama} tidak tersedia untuk disewa.`);
            }
        });

        // Buat ID pesanan baru
        const idPesananBaru = `pesanan_${Date.now()}`;

        // Referensi dokumen pesanan baru
        const pesananRef = doc(db, "pesanan", idPesananBaru);

        // Hitung total harga pesanan
        const totalHargaPesanan = pesanan.items.reduce((total, item) => total + item.totalHarga, 0);

        // Simpan data pesanan ke Firestore
        await setDoc(pesananRef, {
            email: pesanan.email,
            tanggalPemesanan: pesanan.tanggalPemesanan || new Date().toISOString().split('T')[0],
            items: pesanan.items,
            statusPembayaran: pesanan.statusPembayaran || "Belum dibayar",
            namaPenyewa: pesanan.namaPenyewa,
            totalHargaPesanan
        });

        console.log("Pesanan motor berhasil disimpan:", pesanan);
    } catch (error) {
        console.error("Error saat menyimpan data pesanan motor:", error.message);
        Alert.alert("Error", error.message);
        throw error;
    }
}

export async function simpanDataPesananSepeda(pesanan) {
    try {
        if (!pesanan.email || !pesanan.items || !pesanan.namaPenyewa) {
            throw new Error("Email, nama penyewa, dan daftar item harus disertakan.");
        }

        // Validasi setiap item sepeda
        pesanan.items.forEach(item => {
            if (item.status === "tidak tersedia") {
                throw new Error(`Sepeda ${item.nama} tidak tersedia untuk disewa.`);
            }
        });

        // Buat ID pesanan baru
        const idPesananBaru = `pesanan_${Date.now()}`;

        // Referensi dokumen pesanan baru
        const pesananRef = doc(db, "pesanan", idPesananBaru);

        // Hitung total harga pesanan
        const totalHargaPesanan = pesanan.items.reduce((total, item) => total + item.totalHarga, 0);

        // Simpan data pesanan ke Firestore
        await setDoc(pesananRef, {
            email: pesanan.email,
            tanggalPemesanan: pesanan.tanggalPemesanan || new Date().toISOString().split('T')[0],
            items: pesanan.items,
            statusPembayaran: pesanan.statusPembayaran || "Belum dibayar",
            namaPenyewa: pesanan.namaPenyewa,
            totalHargaPesanan
        });

        console.log("Pesanan sepeda berhasil disimpan:", pesanan);
    } catch (error) {
        console.error("Error saat menyimpan data pesanan sepeda:", error.message);
        Alert.alert("Error", error.message);
        throw error;
    }
}


export async function bacaPesanan(email, pesananId) {
    try {
        // Mengakses koleksi pesanan berdasarkan email dan id pesanan
        const pesananRef = doc(db, 'pesanan', pesananId);
        const pesananSnapshot = await getDoc(pesananRef);

        if (!pesananSnapshot.exists()) {
            throw new Error("Pesanan tidak ditemukan.");
        }

        const pesananData = pesananSnapshot.data();

        // Menyusun data pesanan dengan format yang sesuai
        const pesananDetail = {
            id: pesananSnapshot.id,
            email: pesananData.email,
            tanggalPemesanan: pesananData.tanggalPemesanan,
            items: pesananData.items,
            statusPembayaran: pesananData.statusPembayaran,
            namaPenyewa: pesananData.namaPenyewa,
            totalHargaPesanan: pesananData.totalHargaPesanan,
        };

        return pesananDetail;
    } catch (error) {
        console.error("Error saat membaca data pesanan:", error.message);
        throw error;
    }
}

export const hapusPesanan = async (pesananId) => {
        try {
        const pesananRef = doc(db, 'pesanan', pesananId); // Menyusun referensi ke dokumen pesanan
        await deleteDoc(pesananRef);  // Menghapus dokumen pesanan
        console.log("Pesanan berhasil dihapus");
        } catch (error) {
        console.error("Error saat menghapus pesanan: ", error);
        throw error;  // Melempar error agar bisa ditangani di tempat lain
        }
};

export const updateStatusPesanan = async (pesananId, status) => {
    try {
        // Pastikan pesananId valid
        if (!pesananId) {
            throw new Error('Pesanan ID tidak valid');
        }

        // Referensi ke dokumen pesanan
        const pesananRef = doc(db, 'pesanan', pesananId);

        // Update status pembayaran
        await updateDoc(pesananRef, {
            statusPembayaran: 'Sudah Dibayar',
        });

        console.log(`Status pembayaran pesanan dengan ID ${pesananId} berhasil diubah menjadi ${status}`);
    } catch (error) {
        console.error('Error mengupdate status pesanan:', error);
        throw new Error('Terjadi kesalahan saat mengupdate status pesanan');
    }
};