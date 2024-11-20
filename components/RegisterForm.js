import React, { useState } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import { registerUser } from '../services/authService';
import { simpanDataPengguna } from '../services/dbService';
import styles from '../styles/formStyles';

export default function RegisterForm({ onLogin }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        const user = await registerUser(email, password, username);

        if (user) {
        const penggunaData = { username, email, vroomPassword: password };
        await simpanDataPengguna(email, penggunaData);
        onLogin();
        }
    };

    return (
        <View>
        <Text style={styles.judul}>Registrasi Aplikasi Vroom</Text>
        <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
        <Button title="Daftar" onPress={handleRegister} />
        <Button title="Kembali ke Login" onPress={onLogin} />
        </View>
    );
}
