import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function KonfirmasiPenyewaan({ detail, onKembali }) {
    return (
        <View style={styles.container}>
            <Text style={styles.judul}>Konfirmasi Penyewaan</Text>
            <Text>Nama: {detail.nama}</Text>
            <Text>Kendaraan: {detail.kendaraan}</Text>
            <Text>Durasi: {detail.durasi} hari</Text>
            <Text>Tanggal: {detail.tanggal}</Text>
            <Button title="Kembali ke Beranda" onPress={onKembali} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    judul: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
});
