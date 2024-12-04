import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification } from 'firebase/auth';
import { Alert } from 'react-native';

// Fungsi untuk validasi email (Pure Function)
const validasiEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);  // Mengembalikan true jika format email valid
};

// Higher-order function untuk memverifikasi email
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

        // Menggunakan higher-order function untuk verifikasi email
        const emailVerified = await verifikasiEmail(validasiEmail)(user);
        if (!emailVerified) return null;

        Alert.alert("Registrasi Berhasil", "Email verifikasi telah dikirim.");
        return user;
    } catch (error) {
        Alert.alert("Registrasi Gagal", error.message);
        return null;
    }
};

// Fungsi login pengguna
export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Menggunakan higher-order function untuk verifikasi email
        const emailVerified = await verifikasiEmail(validasiEmail)(user);
        if (!emailVerified) return null;

        return user;
    } catch (error) {
        Alert.alert("Login Gagal", "Periksa kembali email dan password Anda.");
        return null;
    }
};

// Fungsi reset password
export const resetPassword = async (email) => {
    try {
        if (!validasiEmail(email)) {
            Alert.alert("Email Tidak Valid", "Format email yang dimasukkan tidak valid.");
            return;
        }
        await sendPasswordResetEmail(auth, email);
        Alert.alert("Reset Berhasil", "Silakan cek email Anda untuk mereset password.");
    } catch (error) {
        Alert.alert("Reset Gagal", error.message);
    }
};
