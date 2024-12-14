import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { ambilDataSepeda } from '../services/dbService'; 
import SepedaForm from '../KendaraanForm/SepedaForm';
import { useNavigation } from '@react-navigation/native';
import styles from '../StylesKendaraan/SepedaScreenStyles'; 

export default function SepedaScreen() {
    const [sepedaData, setSepedaData] = useState([]);
    const [sepedaTerpilih, setSepedaTerpilih] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchSepedaData = async () => {
            const data = await ambilDataSepeda();
            if (data) {
                setSepedaData(data);
            }
        };

        fetchSepedaData();
    }, []);

    const lanjutKeSewa = () => {
        if (sepedaTerpilih) {
            navigation.navigate('Sewa Sepeda', { sepedaTerpilih });
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={sepedaData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <SepedaForm
                        sepeda={item}
                        onSelectSepeda={setSepedaTerpilih}
                        sepedaDipilih={sepedaTerpilih}
                    />
                )}
            />
            {/* Tombol Pilih Sepeda */}
            <View style={styles.tombolContainer}>
                <TouchableOpacity
                    style={[styles.tombolPilih, sepedaTerpilih && styles.tombolAktif]}
                    onPress={lanjutKeSewa}
                    disabled={!sepedaTerpilih}
                >
                    <Text style={styles.teksTombol}>Pilih Sepeda</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
