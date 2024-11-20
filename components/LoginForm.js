import React, { useState } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import { loginUser, verifikasiEmail, validasiEmail } from '../services/authService';
import { ambilDataPengguna } from '../services/dbService';
import styles from '../styles/formStyles';

export default function LoginForm({ onRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const user = await loginUser(email, password);

        if (user) {
        const isVerified = await verifikasiEmail(validasiEmail)(user);
        if (!isVerified) return;

        const userData = await ambilDataPengguna(email);
        if (userData && userData.vroomPassword === password) {
            Alert.alert("Login Berhasil", `Selamat datang, ${userData.username}!`);
        } else {
            Alert.alert("Login Gagal", "Password yang Anda masukkan salah.");
        }
        }
    };

    return (
        <View>
        <Text style={styles.judul}>Login Aplikasi Vroom</Text>
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
        <Button title="Login" onPress={handleLogin} />
        <Text style={styles.registerText} onPress={onRegister}>Belum punya akun? Daftar di sini</Text>
        </View>
    );
}
