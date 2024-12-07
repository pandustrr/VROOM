import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import SewaForm from '../SewaForm/SewaMotorForm';

export default function SewaScreen() {
    const route = useRoute();
    const motorTerpilih = route.params?.motorTerpilih;

    if (!motorTerpilih) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Tidak ada motor yang dipilih</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <SewaForm motor={motorTerpilih} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
});
