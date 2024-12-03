import React, { useState } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import { resetPassword } from '../services/authService';
import styles from '../styles/formStyles';

export default function ResetPasswordForm({ onBackToLogin }) {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleReset = async () => {
        if (!email) {
            setMessage("Email Kosong: Silakan masukkan email Anda.");
            return;
        }

        try {
            await resetPassword(email);
            setMessage("Berhasil: Silakan cek email Anda untuk reset password.");
        } catch (error) {
            setMessage("Gagal: Terjadi kesalahan. Coba lagi.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.judul}>Reset Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Masukkan email Anda"
                value={email}
                onChangeText={setEmail}
            />
            {message ? <Text style={styles.message}>{message}</Text> : null}
            <Button title="Reset Password" onPress={handleReset} />
            <Text style={styles.link} onPress={onBackToLogin}>Kembali ke Login</Text>
        </View>
    );
}
