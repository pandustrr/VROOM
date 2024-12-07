import { auth } from './firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
} from 'firebase/auth';
import { Alert } from 'react-native';

<<<<<<< HEAD
// Fungsi validasi email
const validasiEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email); // Mengembalikan true jika email valid
};

// Higher-order function untuk verifikasi email
const verifikasiEmail = async (user) => {
    if (!user.emailVerified) {
        Alert.alert(
            "Email Belum Terverifikasi",
            "Kami telah mengirimkan email verifikasi. Silakan periksa inbox Anda."
        );
        await sendEmailVerification(user); // Kirim ulang email verifikasi
        return false;
    }
    return true;
};

// Fungsi untuk register pengguna
=======
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
>>>>>>> b0b6c8089019fcbbd2470135620b0a399db2be3d
export const registerUser = async (email, password, username) => {
    try {
        if (!validasiEmail(email)) {
            Alert.alert("Registrasi Gagal", "Format email tidak valid.");
            return null;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

<<<<<<< HEAD
        await sendEmailVerification(user);
        Alert.alert(
            "Registrasi Berhasil",
            "Akun Anda telah dibuat. Silakan cek email Anda untuk memverifikasi akun."
        );

=======
        // Menggunakan higher-order function untuk verifikasi email
        const emailVerified = await verifikasiEmail(validasiEmail)(user);
        if (!emailVerified) return null;

        Alert.alert("Registrasi Berhasil", "Email verifikasi telah dikirim.");
>>>>>>> b0b6c8089019fcbbd2470135620b0a399db2be3d
        return user;
    } catch (error) {
        Alert.alert("Registrasi Gagal", error.message);
        return null;
    }
};

<<<<<<< HEAD
// Fungsi untuk login pengguna
export const loginUser = async (email, password) => {
    try {
        if (!validasiEmail(email)) {
            Alert.alert("Login Gagal", "Format email tidak valid.");
            return null;
        }
=======
// Fungsi login pengguna
export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Menggunakan higher-order function untuk verifikasi email
        const emailVerified = await verifikasiEmail(validasiEmail)(user);
        if (!emailVerified) return null;
>>>>>>> b0b6c8089019fcbbd2470135620b0a399db2be3d

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const emailVerified = await verifikasiEmail(user);
        if (!emailVerified) return null;

        return user;
    } catch (error) {
        Alert.alert("Login Gagal", error.message);
        return null;
    }
};

<<<<<<< HEAD
// Fungsi untuk reset password
export const resetPassword = async (email) => {
    try {
        if (!validasiEmail(email)) {
            Alert.alert("Reset Gagal", "Format email tidak valid.");
            return;
        }

=======
// Fungsi reset password
export const resetPassword = async (email) => {
    try {
        if (!validasiEmail(email)) {
            Alert.alert("Email Tidak Valid", "Format email yang dimasukkan tidak valid.");
            return;
        }
>>>>>>> b0b6c8089019fcbbd2470135620b0a399db2be3d
        await sendPasswordResetEmail(auth, email);
        Alert.alert("Reset Berhasil", "Silakan cek email Anda untuk mereset password.");
    } catch (error) {
        Alert.alert("Reset Gagal", error.message);
    }
};
