import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { simpanPenyewaan } from './penyewaanService';

export default function FormPenyewaan({ kendaraan, onSelesai }) {
    const [nama, setNama] = useState('');
    const [durasi, setDurasi] = useState('');
    const [tanggal, setTanggal] = useState('');

    const handleSubmit = async () => {
        const data = { nama, kendaraan, durasi, tanggal };
        const berhasil = await simpanPenyewaan(data);
        if (berhasil) onSelesai(data);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.judul}>Formulir Penyewaan</Text>
            <Text>Kendaraan: {kendaraan}</Text>
            <TextInput
                style={styles.input}
                placeholder="Nama Penyewa"
                value={nama}
                onChangeText={setNama}
            />
            <TextInput
                style={styles.input}
                placeholder="Durasi (hari)"
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
    container: { padding: 20 },
    judul: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
});
