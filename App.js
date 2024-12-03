import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import PilihanKendaraan from './src/penyewaan/PilihanKendaraan';
import FormPenyewaan from './src/penyewaan/FormPenyewaan';
import KonfirmasiPenyewaan from './src/penyewaan/KonfirmasiPenyewaan';

export default function App() {
    const [screen, setScreen] = useState('login'); // Default ke LoginScreen
    const [kendaraan, setKendaraan] = useState('');
    const [detailPenyewaan, setDetailPenyewaan] = useState(null);
    const [userName, setUserName] = useState(''); // Menyimpan nama pengguna

    const handleLoginSuccess = (user) => {
        // Setelah login berhasil, kita simpan nama pengguna dan arahkan ke halaman pilihan kendaraan
        const name = user.displayName || 'Pengguna'; // Ganti dengan field username jika perlu
        setUserName(name);
        setScreen('pilihan');
        Alert.alert('Login Berhasil', `Selamat datang, ${name}!`);
    };

    const renderScreen = () => {
        switch (screen) {
            case 'pilihan':
                return (
                    <PilihanKendaraan
                        onSelect={(item) => {
                            setKendaraan(item);
                            setScreen('form');
                        }}
                    />
                );
            case 'form':
                return (
                    <FormPenyewaan
                        kendaraan={kendaraan}
                        onSelesai={(detail) => {
                            setDetailPenyewaan(detail);
                            setScreen('konfirmasi');
                        }}
                    />
                );
            case 'konfirmasi':
                return (
                    <KonfirmasiPenyewaan
                        detail={detailPenyewaan}
                        onKembali={() => setScreen('pilihan')}
                    />
                );
            default:
                return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
        }
    };

    return <View style={styles.container}>{renderScreen()}</View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
});
