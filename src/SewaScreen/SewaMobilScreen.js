import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { auth } from '../services/firebase'; 
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

            const pesanan = {
                email: userEmail,
                tanggalPemesanan: new Date().toISOString().split('T')[0], 
                items: [
                    {
                        id: mobilTerpilih.id,
                        nama: mobilTerpilih.nama,
                        gambar: mobilTerpilih.gambar,
                        harga: mobilTerpilih.harga,
                        status: mobilTerpilih.status,
                        hariPenyewaan: values.hariPenyewaan,
                        totalHarga: values.totalHarga,
                    },
                ],
                statusPembayaran: 'Belum dibayar',
                namaPenyewa: values.namaPenyewa,
                totalHargaPesanan: values.totalHarga,
            };

            await simpanDataPesananMobil(pesanan);

            Alert.alert('Sukses', 'Mobil berhasil disewa!', [
                {
                    text: 'OK',
                    onPress: () => navigation.goBack(), 
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
