import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../StylesKendaraan/SepedaFormStyles'; // Sesuaikan dengan path untuk sepeda

export default function SepedaForm({ sepeda, onSelectSepeda, sepedaDipilih }) {
    return (
        <TouchableOpacity
            onPress={() => onSelectSepeda(sepeda)}
            style={[
                styles.sepedaContainer,
                sepedaDipilih && sepedaDipilih.id === sepeda.id && styles.sepedaDipilih,
            ]}
        >
            <Image source={{ uri: sepeda.gambar }} style={styles.gambarSepeda} />
            <Text style={styles.namaSepeda}>{sepeda.nama}</Text>
            <Text style={styles.hargaSepeda}>Rp {sepeda.harga}/hari</Text>
            <Text
                style={[
                    styles.statusSepeda,
                    sepeda.status === 'tersedia' ? styles.tersedia : styles.tidakTersedia,
                ]}
            >
                {sepeda.status === 'tersedia' ? 'Tersedia' : 'Tidak Tersedia'}
            </Text>
        </TouchableOpacity>
    );
}
