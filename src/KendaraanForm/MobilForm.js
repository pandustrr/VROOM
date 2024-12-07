import React from "react";
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StyleSheet } from "react-native";

export default function MobilForm({ mobil, onSelectMobil, mobilDipilih }) {
    return (
        <TouchableOpacity
            onPress={() => onSelectMobil(mobil)}
            style={[
                styles.mobilContainer,
                mobilDipilih && mobilDipilih.id === mobil.id && styles.mobilDipilih, 
            ]}
        >
            <Image source={{ uri: mobil.gambar }} style={styles.gambarMobil} />
            <Text style={styles.namaMobil}>{mobil.nama}</Text>
            <Text style={styles.hargaMobil}>Rp {mobil.harga}/hari</Text>
            <Text
                style={[
                    styles.statusMobil,
                    mobil.status === 'tersedia' ? styles.tersedia : styles.tidakTersedia,
                ]}
            >
                {mobil.status === 'tersedia' ? 'Tersedia' : 'Tidak Tersedia'}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    mobilContainer: {
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 16,
    },
    mobilDipilih: {
        borderColor: '#007bff', // Highlight dengan border biru ketika dipilih
        borderWidth: 3,
    },
    gambarMobil: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    namaMobil: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
    },
    hargaMobil: {
        fontSize: 14,
        color: '#6c757d',
        marginTop: 4,
    },
    statusMobil: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 8,
    },
    tersedia: {
        color: 'green',
    },
    tidakTersedia: {
        color: 'red',
    },
});
