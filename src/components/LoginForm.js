import React, { useState } from 'react';
import { View, Alert, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { loginUser } from '../services/authService';
import { ambilDataPengguna } from '../services/dbService';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FormPenyewaan  from '../penyewaan/FormPenyewaan';

export default function LoginForm({ onRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const Sewa = FormPenyewaan

    const handleLogin = async () => {
        setLoading(true);
        const user = await loginUser(email, password);
        setLoading(false);

        if (user) {
            const userData = await ambilDataPengguna(email);

            if (userData && userData.vroomPassword === password) {
                Alert.alert("Login Berhasil", `Selamat datang, ${userData.username} !`);
            } else {
                Alert.alert("Login Gagal", "Email atau Password yang Anda masukkan salah.");
            }
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Text h3 style={styles.title}>Login Aplikasi Vroom</Text>
            <Input
                placeholder="Masukkan Email"
                leftIcon={<Icon name="email" size={24} color="gray" />}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                containerStyle={styles.inputContainer}
            />
            <Input
                placeholder="Masukkan Password"
                leftIcon={<Icon name="lock" size={24} color="gray" />}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                containerStyle={styles.inputContainer}
            />
            <Button
                title="Login"
                onPress={handleLogin}
                loading={loading}
                buttonStyle={styles.loginButton}
            />
            <Text style={styles.registerText} onPress={onRegister}>
                Belum punya akun? <Text style={styles.registerLink}>Daftar di sini</Text>
            </Text>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    inputContainer: {
        marginBottom: 15,
    },
    loginButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 5,
    },
    registerText: {
        textAlign: 'center',
        marginTop: 15,
        color: '#555',
    },
    registerLink: {
        color: '#4CAF50',
        fontWeight: 'bold',
    },
});
