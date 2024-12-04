import React, { useState } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import { resetPassword } from '../services/authService';
import styles from '../styles/formStyles';

export default function ResetPasswordForm({ onBackToLogin }) {
    const [email, setEmail] = useState(''); // Menyimpan email
    const [message, setMessage] = useState(''); // Menyimpan pesan feedback

    // Fungsi untuk mereset password
    const handleReset = async () => {
        if (!email) {
            setMessage("Email Kosong: Silakan masukkan email Anda.");
            return;
        }

        try {
            // Panggil service untuk reset password
            await resetPassword(email);
            setMessage("Berhasil: Silakan cek email Anda untuk reset password.");
        } catch (error) {
            setMessage("Gagal: Terjadi kesalahan. Coba lagi.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.judul}>Reset Password</Text>

            {/* Input untuk email */}
            <TextInput
                style={styles.input}
                placeholder="Masukkan email Anda"
                value={email}
                onChangeText={setEmail} // Set email state
            />

            {/* Pesan feedback jika ada */}
            {message ? <Text style={styles.message}>{message}</Text> : null}

            {/* Tombol untuk melakukan reset password */}
            <Button title="Reset Password" onPress={handleReset} />

            {/* Tombol untuk kembali ke halaman login */}
            <Text style={styles.link} onPress={onBackToLogin}>Kembali ke Login</Text>
        </View>
    );
}
