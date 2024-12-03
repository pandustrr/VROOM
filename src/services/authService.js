import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification } from 'firebase/auth';
import { Alert } from 'react-native';

export const registerUser = async (email, password, username) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await sendEmailVerification(user);
        Alert.alert("Registrasi Berhasil", "Email verifikasi telah dikirim.");
        return user;
    } catch (error) {
        Alert.alert("Registrasi Gagal", error.message);
        return null;
    }
};

export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Periksa apakah email sudah terverifikasi
        if (!user.emailVerified) {
            Alert.alert("Email Belum Terverifikasi", "Silakan verifikasi email Anda sebelum login.");
            return null;
        }

        return user;
    } catch (error) {
        Alert.alert("Login Gagal", "Periksa kembali email dan password Anda.");
        return null;
    }
};


export const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        Alert.alert("Reset Gagal", error.message);
    }
};
