import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { auth } from '../services/firebase';
import { simpanDataPesananSepeda } from '../services/dbService'; 
import SewaSepedaForm from '../SewaForm/SewaSepedaForm';

export default function SewaSepedaScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const sepedaTerpilih = route.params?.sepedaTerpilih;

    const handleSewaSubmit = async (values) => {
        try {
            const currentUser = auth.currentUser;
            const userEmail = currentUser?.email;

            if (!userEmail) {
                Alert.alert('Error', 'Anda harus login untuk menyewa sepeda.');
                return;
            }

            if (!sepedaTerpilih || !sepedaTerpilih.id) {
                Alert.alert('Error', 'Data sepeda tidak valid. Silakan coba lagi.');
                return;
            }

            if (sepedaTerpilih.status === 'tidak tersedia') {
                Alert.alert('Sepeda ini tidak tersedia untuk disewa.');
                return;
            }

            const pesanan = {
                email: userEmail,
                tanggalPemesanan: new Date().toISOString().split('T')[0], 
                items: [
                    {
                        id: sepedaTerpilih.id,
                        nama: sepedaTerpilih.nama,
                        gambar: sepedaTerpilih.gambar,
                        harga: sepedaTerpilih.harga,
                        status: sepedaTerpilih.status,
                        hariPenyewaan: values.hariPenyewaan,
                        totalHarga: values.totalHarga,
                    },
                ],
                statusPembayaran: 'Belum dibayar',
                namaPenyewa: values.namaPenyewa,
                totalHargaPesanan: values.totalHarga,
            };

            await simpanDataPesananSepeda(pesanan);

            Alert.alert('Sukses', 'Sepeda berhasil disewa!', [
                {
                    text: 'OK',
                    onPress: () => navigation.goBack(), 
                },
            ]);
        } catch (error) {
            console.error('Error saat menyimpan data pesanan:', error.message);
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
