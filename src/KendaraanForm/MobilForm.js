import React from "react";
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../StylesKendaraan/MobilFormStyles';

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