import { auth } from './firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
} from 'firebase/auth';
import { Alert } from 'react-native';

const validasiEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email); 
};

const verifikasiEmail = async (user) => {
    if (!user.emailVerified) {
        Alert.alert(
            "Email Belum Terverifikasi",
            "Kami telah mengirimkan email verifikasi. Silakan periksa inbox Anda."
        );
        await sendEmailVerification(user);
        return false;
    }
    return true;
};

export const registerUser = async (email, password, username) => {
    try {
        if (!validasiEmail(email)) {
            Alert.alert("Registrasi Gagal", "Format email tidak valid.");
            return null;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await sendEmailVerification(user);
        Alert.alert(
            "Registrasi Berhasil",
            "Akun Anda telah dibuat. Silakan cek email Anda untuk memverifikasi akun."
        );

        return user;
    } catch (error) {
        Alert.alert("Registrasi Gagal", error.message);
        return null;
    }
};

export const loginUser = async (email, password) => {
    try {
        if (!validasiEmail(email)) {
            Alert.alert("Login Gagal", "Format email tidak valid.");
            return null;
        }

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

// Fungsi untuk reset password
export const resetPassword = async (email) => {
    try {
        if (!validasiEmail(email)) {
            Alert.alert("Reset Gagal", "Format email tidak valid.");
            return;
        }

        await sendPasswordResetEmail(auth, email);
        Alert.alert("Reset Berhasil", "Silakan cek email Anda untuk mereset password.");
    } catch (error) {
        Alert.alert("Reset Gagal", error.message);
    }
};
