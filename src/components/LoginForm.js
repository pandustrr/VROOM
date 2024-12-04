import React, { useState } from 'react';
import { KeyboardAvoidingView, Alert } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/formStyles'; // pastikan sudah mendefinisikan styles yang dibutuhkan
import { loginUser } from '../services/authService';
import { ambilDataPengguna } from '../services/dbService';

export default function LoginForm({ onRegister, onResetPassword }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            // Cek apakah login berhasil dengan fungsi loginUser
            const user = await loginUser(email, password);
            setLoading(false);

            // Jika user ditemukan, ambil data pengguna dari database
            if (user) {
                const userData = await ambilDataPengguna(email);

                // Periksa apakah password sesuai dengan yang ada di database
                if (userData && userData.vroomPassword === password) {
                    Alert.alert('Login Berhasil', `Selamat datang, ${userData.username}!`);
                } else {
                    Alert.alert('Login Gagal', 'Email atau Password yang Anda masukkan salah.');
                }
            } else {
                Alert.alert('Login Gagal', 'Pengguna tidak ditemukan.');
            }
        } catch (error) {
            setLoading(false);
            Alert.alert('Error', 'Terjadi kesalahan saat login.');
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Text style={styles.loginTitle}>Login Aplikasi Vroom</Text>

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

            {/* Tombol Login */}
            <Button
                title="Login"
                onPress={handleLogin}
                loading={loading}
                buttonStyle={styles.loginButton}
            />

            {/* Link untuk registrasi */}
            <Text style={styles.registerText}>
                Belum punya akun?{' '}
                <Text style={styles.registerLink} onPress={onRegister}>
                    Daftar di sini
                </Text>
            </Text>

            {/* Link untuk reset password */}
            <Text style={styles.registerText}>
                Lupa password?{' '}
                <Text style={styles.registerLink} onPress={onResetPassword}>
                    Reset di sini
                </Text>
            </Text>
        </KeyboardAvoidingView>
    );
}
