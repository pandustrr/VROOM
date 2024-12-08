    import React from 'react';
    import { View, Text, StyleSheet } from 'react-native';
    import { useRoute } from '@react-navigation/native';
    import SewaForm from '../SewaForm/SewaSepedaForm'; // Ganti ke form sepeda

    export default function SewaScreen() {
        const route = useRoute();
        const sepedaTerpilih = route.params?.sepedaTerpilih; // Ganti variabel menjadi sepeda

        if (!sepedaTerpilih) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Tidak ada sepeda yang dipilih</Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <SewaForm sepeda={sepedaTerpilih} /> 
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
