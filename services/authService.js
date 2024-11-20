import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { Alert } from 'react-native';

// Pure function untuk validasi email (hanya bergantung pada input)
const validasiEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
};

// Higher-order function untuk verifikasi email
const verifikasiEmail = (validasiFn) => {
    return async (user) => {
        if (!validasiFn(user.email)) {
        Alert.alert("Email Tidak Valid", "Format email yang dimasukkan tidak valid.");
        return false;
        }
        if (!user.emailVerified) {
        Alert.alert("Email Belum Terverifikasi", "Silakan verifikasi email Anda.");
        await sendEmailVerification(user);
        return false;
        }
        return true;
    };
};

// Fungsi register pengguna
export const registerUser = async (email, password, username) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Kirim email verifikasi
        await sendEmailVerification(user);
        Alert.alert("Registrasi Berhasil", "Email verifikasi telah dikirim. Silakan cek email Anda.");

        return user;
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
        Alert.alert("Email Sudah Terdaftar", "Gunakan email lain.");
        } else {
        console.error("Error saat registrasi:", error.message);
        Alert.alert("Registrasi Gagal", error.message);
        }
        return null;
    }
};

// Fungsi login pengguna
export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error saat login:", error.message);
        Alert.alert("Login Gagal", error.message);
        return null;
    }
};

export { validasiEmail, verifikasiEmail };
