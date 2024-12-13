    import React from 'react';
    import { View, Alert, StyleSheet } from 'react-native';
    import { useRoute, useNavigation } from '@react-navigation/native';
    import { auth } from '../services/firebase'; // Sesuaikan path impor sesuai folder
    import { simpanDataPesananMotor } from '../services/dbService';  // Sesuaikan dengan fungsi simpanDataPesananMotor
    import SewaMotorForm from '../SewaForm/SewaMotorForm';

    export default function SewaMotorScreen() {
        const route = useRoute();
        const navigation = useNavigation();
        const motorTerpilih = route.params?.motorTerpilih;

        const handleSewaSubmit = async (values) => {
            try {
                const currentUser = auth.currentUser;
                const userEmail = currentUser?.email;

                if (!userEmail) {
                    Alert.alert('Error', 'Anda harus login untuk menyewa motor.');
                    return;
                }

                if (!motorTerpilih || !motorTerpilih.id) {
                    Alert.alert('Error', 'Data motor tidak valid. Silakan coba lagi.');
                    return;
                }

                if (motorTerpilih.status === 'tidak tersedia') {
                    Alert.alert('Motor ini tidak tersedia untuk disewa.');
                    return; 
                }

                // Format ulang data untuk struktur Firestore baru
                const pesanan = {
                    email: userEmail,
                    tanggalPemesanan: new Date().toISOString().split('T')[0], // Format YYYY-MM-DD
                    items: [
                        {
                            id: motorTerpilih.id,
                            nama: motorTerpilih.nama,
                            gambar: motorTerpilih.gambar,
                            harga: motorTerpilih.harga,
                            status: motorTerpilih.status,
                            hariPenyewaan: values.hariPenyewaan,
                            totalHarga: values.totalHarga,
                        },
                    ],
                    statusPembayaran: 'Belum dibayar',
                    namaPenyewa: values.namaPenyewa,
                    totalHargaPesanan: values.totalHarga,
                };

                await simpanDataPesananMotor(pesanan);

                // Notifikasi sukses
                Alert.alert('Sukses', 'Motor berhasil disewa!', [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack(), // Navigasi kembali ke halaman sebelumnya
                    },
                ]);
            } catch (error) {
                console.error('Error saat menyimpan data pesanan:', error.message);
                Alert.alert('Error', 'Terjadi kesalahan saat menyewa motor. Silakan coba lagi.');
            }
        };

        return (
            <View style={styles.container}>
                {motorTerpilih ? (
                    <SewaMotorForm motor={motorTerpilih} onSubmit={handleSewaSubmit} />
                ) : (
                    Alert.alert('Error', 'Motor yang dipilih tidak ditemukan.')
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
