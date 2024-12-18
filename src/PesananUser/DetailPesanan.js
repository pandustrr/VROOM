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
                            await hapusPesanan(data.id); 
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
        <View>
            <Text style={styles.label}>Nama Penyewa:</Text>
            <Text style={styles.value}>{data?.namaPenyewa || '-'}</Text>

            <Text style={styles.label}>Tanggal Pemesanan:</Text>
            <Text style={styles.value}>{data?.tanggalPemesanan || '-'}</Text>

            {data?.items && data.items.length > 0 ? (
                data.items.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                        {item.gambar ? (
                            <Image source={{ uri: item.gambar }} style={styles.image} />
                        ) : (
                            <Text style={styles.noImage}>Gambar tidak tersedia</Text>
                        )}
                        <Text style={styles.itemLabel}>Nama Kendaraan:</Text>
                        <Text style={styles.itemValue}>{item?.nama || '-'}</Text>

                        <Text style={styles.itemLabel}>Hari Penyewaan:</Text>
                        <Text style={styles.itemValue}>{item?.hariPenyewaan || '-'}</Text>

                    </View>
                ))
            ) : (
                <Text style={styles.noItems}>Tidak ada item pada pesanan ini.</Text>
            )}

            <Text style={styles.label}>Total Harga Pesanan:</Text>
            <Text style={styles.value}>Rp {data?.totalHargaPesanan || '-'}</Text>

            {/* Teks instruksi pembayaran */}
            {data?.statusPembayaran === 'Belum dibayar' && (
                <View style={styles.paymentInstruction}>
                    <Text style={styles.instructionText}>Silahkan melakukan pembayaran dan mengambil kendaraan di:</Text>
                    <Text style={styles.instructionText}>Alamat: Jl. Semeru XII</Text>
                </View>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detail Pesanan</Text>
            {renderDetail()}

            {/* Tombol Hapus Pesanan berwarna merah */}
            <TouchableOpacity style={styles.hapusButton} onPress={handleDeletePesanan}>
                <Text style={styles.buttonText}>Batalkan Pesanan</Text>
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
    noImage: {
        textAlign: 'center',
        fontSize: 16,
        color: '#6c757d',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    value: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    itemContainer: {
        marginBottom: 20,
    },
    itemLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 5,
    },
    itemValue: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    paymentInstruction: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
    },
    instructionText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
    hapusButton: {
        backgroundColor: '#FF5C5C', 
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
    noItems: {
        fontSize: 16,
        color: '#6c757d',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default DetailPesanan;
