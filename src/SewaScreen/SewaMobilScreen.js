import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { auth } from '../services/firebase'; // Sesuaikan path impor sesuai folder
import { simpanDataPesananMobil } from '../services/dbService';
import SewaMobilForm from '../SewaForm/SewaMobilForm';

export default function SewaMobilScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const mobilTerpilih = route.params?.mobilTerpilih;

    const handleSewaSubmit = async (values) => {
        try {
            const currentUser = auth.currentUser;
            const userEmail = currentUser?.email;

            if (!userEmail) {
                Alert.alert('Error', 'Anda harus login untuk menyewa mobil.');
                return;
            }

            if (!mobilTerpilih || !mobilTerpilih.id) {
                Alert.alert('Error', 'Data mobil tidak valid. Silakan coba lagi.');
                return;
            }

            if (mobilTerpilih.status === 'tidak tersedia') {
                Alert.alert('Mobil ini tidak tersedia untuk disewa.');
                return; 
            }

            await simpanDataPesananMobil({
                email: userEmail,
                gambar: mobilTerpilih.gambar,
                harga: mobilTerpilih.harga,
                id: mobilTerpilih.id,
                nama: mobilTerpilih.nama,
                status: mobilTerpilih.status,
                namaPenyewa: values.namaPenyewa,
                tanggalPemesanan: values.tanggalPemesanan,
                hariPenyewaan: values.hariPenyewaan,
                totalHarga: values.totalHarga,
            });

            // Notifikasi sukses
            Alert.alert('Sukses', 'Mobil berhasil disewa!', [
                {
                    text: 'OK',
                    onPress: () => navigation.goBack(), // Navigasi kembali ke halaman sebelumnya
                },
            ]);
        } catch (error) {
            console.error('Error saat menyimpan data pesanan:', error.message);
            Alert.alert('Error', 'Terjadi kesalahan saat menyewa mobil. Silakan coba lagi.');
        }
    };

    return (
        <View style={styles.container}>
            {mobilTerpilih ? (
                <SewaMobilForm mobil={mobilTerpilih} onSubmit={handleSewaSubmit} />
            ) : (
                Alert.alert('Error', 'Mobil yang dipilih tidak ditemukan.')
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
