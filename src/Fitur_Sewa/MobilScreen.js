import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ambilDataMobil } from '../services/dbService';
import { useNavigation } from '@react-navigation/native';
import MobilForm from '../components/MobilForm';

export default function MoiblScreen() {
    const [mobilData, setMobilData] = useState([]);
    const [mobilTerpilih, setMobilTerpilih] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchMobilData = async () => {
            const data = await ambilDataMobil();
            if (data) {
                setMobilData(data);
            }
        };

        fetchMobilData();
    }, []);

    const lanjutKeSewa = () => {
        if (mobilTerpilih) {
            navigation.navigate('Sewa', { mobilTerpilih });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pilih Mobil</Text>
            <FlatList
                data={mobilData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <MobilForm
                        mobil={item}
                        onSelectMobil={setMobilTerpilih}
                        mobilDipilih={mobilTerpilih}
                    />
                )}
            />
            {/* Tombol Pilih Mobil */}
            <View style={styles.tombolContainer}>
                <TouchableOpacity
                    style={[styles.tombolPilih, mobilTerpilih && styles.tombolAktif]}
                    onPress={lanjutKeSewa}
                    disabled={!mobilTerpilih}
                >
                    <Text style={styles.teksTombol}>Pilih Mobil</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    tombolContainer: {
        padding: 16,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    tombolPilih: {
        backgroundColor: '#6c757d',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    tombolAktif: {
        backgroundColor: '#007bff',
    },
    teksTombol: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});