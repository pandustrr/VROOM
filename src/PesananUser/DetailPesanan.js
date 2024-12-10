import React from 'react';
import { View, Text, Alert, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { hapusPesanan } from '../services/dbService';

const DetailPesanan = ({ route, navigation }) => {
    const { data } = route.params;

    const handleDeletePesanan = async () => {
        if (!data || !data.id) {
            Alert.alert("Error", "Data pesanan tidak valid.");
            return;
        }

        Alert.alert(
            "Hapus Pesanan",
            "Apakah Anda yakin ingin menghapus pesanan ini?",
            [
                { text: "Batal", style: "cancel" },
                {
                    text: "Hapus",
                    onPress: async () => {
                        try {
                            await hapusPesanan(data.id, data.email);
                            Alert.alert("Berhasil", "Pesanan berhasil dihapus.");
                            navigation.goBack();
                        } catch (error) {
                            console.error("Error saat menghapus pesanan: ", error);
                            Alert.alert("Error", "Gagal menghapus pesanan. Silakan coba lagi.");
                        }
                    },
                },
            ]
        );
    };

    const renderDetail = () => (
        <>
            <Text>ID Pesanan: {data?.id}</Text>
            {data?.gambar ? (
                <Image source={{ uri: data.gambar }} style={styles.image} />
            ) : (
                <Text>Gambar tidak tersedia</Text>
            )}
            <Text>Nama Penyewa: {data?.namaPenyewa}</Text>
            <Text>Status: {data?.status}</Text>
            <Text>Harga: {data?.harga}</Text>
            <Text>Tanggal Pemesanan: {data?.tanggalPemesanan}</Text>
            <Text>Total Harga: {data?.totalHarga}</Text>
        </>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detail Pesanan</Text>
            {renderDetail()}
            <TouchableOpacity style={styles.button} onPress={handleDeletePesanan}>
                <Text style={styles.buttonText}>Hapus Pesanan</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#ff5c5c',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DetailPesanan;
