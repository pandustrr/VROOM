import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const kendaraan = {
    sedan: ['Honda City', 'Toyota Camry', 'Suzuki Ciaz'],
    family: ['Avanza', 'Innova', 'Ertiga'],
    motor: ['Yamaha Nmax', 'Honda Vario'],
    sepeda: ['Polygon', 'United'],
};

export default function PilihanKendaraan({ onSelect }) {
    return (
        <View style={styles.container}>
            {Object.entries(kendaraan).map(([kategori, daftar]) => (
                <View style={styles.kategori} key={kategori}>
                    <Text style={styles.judul}>{kategori}</Text>
                    <ScrollView horizontal>
                        {daftar.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.card}
                                onPress={() => onSelect(item)}
                            >
                                <Text>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 10 },
    kategori: { marginBottom: 15 },
    judul: { fontSize: 18, fontWeight: 'bold' },
    card: {
        backgroundColor: '#f8f8f8',
        marginRight: 10,
        padding: 10,
        borderRadius: 5,
    },
});
