import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { simpanPenyewaan } from './penyewaanService'; // Import service simpanPenyewaan

export default function FormPenyewaan({ kendaraan, onSelesai }) {
    const [nama, setNama] = useState('');
    const [durasi, setDurasi] = useState('');
    const [tanggal, setTanggal] = useState('');

    const handleSubmit = async () => {
        if (!nama || !durasi || !tanggal) {
            Alert.alert('Peringatan', 'Semua field harus diisi!');
            return;
        }

        const data = { nama, kendaraan, durasi, tanggal };

        try {
            const berhasil = await simpanPenyewaan(data); // Memanggil fungsi untuk menyimpan data penyewaan
            if (berhasil) {
                onSelesai(data); // Mengirim data ke layar berikutnya jika penyewaan berhasil disimpan
            } else {
                Alert.alert('Error', 'Penyewaan gagal disimpan');
            }
        } catch (error) {
            Alert.alert('Error', 'Terjadi kesalahan saat menyimpan penyewaan');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.judul}>Formulir Penyewaan</Text>
            <Text>Kendaraan yang dipilih: {kendaraan}</Text>

            <TextInput
                style={styles.input}
                placeholder="Nama Penyewa"
                value={nama}
                onChangeText={setNama}
            />

            <TextInput
                style={styles.input}
                placeholder="Durasi Penyewaan (hari)"
                keyboardType="numeric"
                value={durasi}
                onChangeText={setDurasi}
            />

            <TextInput
                style={styles.input}
                placeholder="Tanggal Mulai (YYYY-MM-DD)"
                value={tanggal}
                onChangeText={setTanggal}
            />

            <Button title="Sewa Sekarang" onPress={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1,
    },
    judul: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
});
