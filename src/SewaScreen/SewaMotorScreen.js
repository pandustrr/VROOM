import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { auth } from '../services/firebase'; // Sesuaikan path impor sesuai folder
import { simpanDataPesananMotor } from '../services/dbService'; // Pastikan mengimpor fungsi yang benar
import SewaMotorForm from '../SewaForm/SewaMotorForm'; // Form khusus untuk motor

export default function SewaMotorScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const motorTerpilih = route.params?.motorTerpilih;

    const handleSewaSubmit = async () => {
        try {
            // Ambil email pengguna dari autentikasi Firebase
            const currentUser = auth.currentUser;
            const userEmail = currentUser?.email;

            // Validasi apakah pengguna sudah login
            if (!userEmail) {
                Alert.alert('Error', 'Anda harus login untuk menyewa motor.');
                return;
            }

            // Validasi data motor
            if (!motorTerpilih || !motorTerpilih.id) {
                Alert.alert('Error', 'Data motor tidak valid. Silakan coba lagi.');
                return;
            }

            // Cek status motor, jika tidak tersedia, tampilkan pesan error dan hentikan proses
            if (motorTerpilih.status === 'tidak tersedia') {
                Alert.alert('Motor ini tidak tersedia untuk disewa.');
                return; // Hentikan proses jika motor tidak tersedia
            }

            // Simpan data penyewaan motor ke Firestore
            await simpanDataPesananMotor({
                email: userEmail,
                gambar: motorTerpilih.gambar,
                harga: motorTerpilih.harga,
                id: motorTerpilih.id,
                nama: motorTerpilih.nama,
                status: motorTerpilih.status,
            });

            // Notifikasi sukses
            Alert.alert('Sukses', 'Motor berhasil disewa!', [
                {
                    text: 'OK',
                    onPress: () => navigation.goBack(), // Navigasi kembali ke halaman sebelumnya
                },
            ]);
        } catch (error) {
            console.error('Error saat menyimpan data pesanan motor:', error.message);
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
