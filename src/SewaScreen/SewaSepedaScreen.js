import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { auth } from '../services/firebase'; // Sesuaikan path impor sesuai folder
import { simpanDataPesananSepeda } from '../services/dbService'; // Mengimpor fungsi untuk menyimpan data pesanan sepeda
import SewaSepedaForm from '../SewaForm/SewaSepedaForm'; // Form khusus untuk sepeda

export default function SewaSepedaScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const sepedaTerpilih = route.params?.sepedaTerpilih; // Mengambil data sepeda yang dipilih

    const handleSewaSubmit = async () => {
        try {
            // Ambil email pengguna dari autentikasi Firebase
            const currentUser = auth.currentUser;
            const userEmail = currentUser?.email;

            // Validasi apakah pengguna sudah login
            if (!userEmail) {
                Alert.alert('Error', 'Anda harus login untuk menyewa sepeda.');
                return;
            }

            // Validasi data sepeda
            if (!sepedaTerpilih || !sepedaTerpilih.id) {
                Alert.alert('Error', 'Data sepeda tidak valid. Silakan coba lagi.');
                return;
            }

            // Cek status sepeda, jika tidak tersedia, tampilkan pesan error dan hentikan proses
            if (sepedaTerpilih.status === 'tidak tersedia') {
                Alert.alert('Sepeda ini tidak tersedia untuk disewa.');
                return; // Hentikan proses jika sepeda tidak tersedia
            }

            // Simpan data penyewaan sepeda ke Firestore
            await simpanDataPesananSepeda({
                email: userEmail,
                gambar: sepedaTerpilih.gambar,
                harga: sepedaTerpilih.harga,
                id: sepedaTerpilih.id,
                nama: sepedaTerpilih.nama,
                status: sepedaTerpilih.status,
            });

            // Notifikasi sukses
            Alert.alert('Sukses', 'Sepeda berhasil disewa!', [
                {
                    text: 'OK',
                    onPress: () => navigation.goBack(), // Navigasi kembali ke halaman sebelumnya
                },
            ]);
        } catch (error) {
            console.error('Error saat menyimpan data pesanan sepeda:', error.message);
            Alert.alert('Error', 'Terjadi kesalahan saat menyewa sepeda. Silakan coba lagi.');
        }
    };

    return (
        <View style={styles.container}>
            {sepedaTerpilih ? (
                <SewaSepedaForm sepeda={sepedaTerpilih} onSubmit={handleSewaSubmit} />
            ) : (
                Alert.alert('Error', 'Sepeda yang dipilih tidak ditemukan.')
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
