import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/formStyles'; // pastikan sudah mendefinisikan styles yang dibutuhkan
import { registerUser } from '../services/authService';
import { simpanDataPengguna } from '../services/dbService';

export default function RegisterForm({ onLogin }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        // Validasi jika kolom kosong
        if (!username || !email || !password) {
            Alert.alert('Pendaftaran Gagal', 'Semua kolom wajib diisi.');
            return;
        }

        setLoading(true);
        try {
            // Proses registrasi menggunakan service `registerUser`
            const user = await registerUser(email, password, username);
            if (user) {
                // Jika registrasi berhasil, simpan data pengguna
                const penggunaData = { username, email, vroomPassword: password };
                await simpanDataPengguna(email, penggunaData); // Simpan data pengguna di Firestore atau database

                // Tampilkan alert berhasil
                Alert.alert('Pendaftaran Berhasil', 'Akun Anda telah terdaftar.');
                
                // Kembali ke halaman login setelah berhasil
                onLogin();
            }
        } catch (error) {
            // Tangani error jika terjadi kesalahan saat registrasi
            Alert.alert('Pendaftaran Gagal', 'Terjadi kesalahan saat mendaftar.');
        } finally {
            // Nonaktifkan loading setelah selesai
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.judul}>Registrasi Aplikasi Vroom</Text>

            {/* Input untuk username */}
            <Input
                placeholder="Masukkan Username"
                leftIcon={<Icon name="person" size={24} color="gray" />}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                containerStyle={{ marginBottom: 10 }}
                style={styles.input}
            />

            {/* Input untuk email */}
            <Input
                placeholder="Masukkan Email"
                leftIcon={<Icon name="email" size={24} color="gray" />}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                containerStyle={{ marginBottom: 10 }}
                style={styles.input}
            />

            {/* Input untuk password */}
            <Input
                placeholder="Masukkan Password"
                leftIcon={<Icon name="lock" size={24} color="gray" />}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                containerStyle={{ marginBottom: 20 }}
                style={styles.input}
            />

            {/* Tombol untuk mendaftar */}
            <Button
                title="Daftar"
                onPress={handleRegister}
                loading={loading}
                buttonStyle={styles.registerButton}
            />

            {/* Tombol untuk kembali ke login */}
            <Button
                title="Kembali ke Login"
                onPress={onLogin}
                buttonStyle={styles.backButton}
                containerStyle={{ marginTop: 10 }}
            />
        </View>
    );
}
