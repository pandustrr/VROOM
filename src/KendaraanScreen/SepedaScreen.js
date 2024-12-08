import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { ambilDataSepeda } from '../services/dbService';  // Sesuaikan dengan fungsi untuk ambil data sepeda
import SepedaForm from '../KendaraanForm/SepedaForm';  // Ganti dengan SepedaForm
import { useNavigation } from '@react-navigation/native';
import styles from '../StylesKendaraan/SepedaScreenStyles';  // Pastikan file style sesuai

export default function SepedaScreen() {
    const [sepedaData, setSepedaData] = useState([]);  // Ganti motorData menjadi sepedaData
    const [sepedaTerpilih, setSepedaTerpilih] = useState(null);  // Ganti motorTerpilih menjadi sepedaTerpilih
    const navigation = useNavigation();

    useEffect(() => {
        const fetchSepedaData = async () => {  // Ubah fetchMotorData menjadi fetchSepedaData
            const data = await ambilDataSepeda();  // Pastikan fungsi ambilDataSepeda untuk sepeda
            if (data) {
                setSepedaData(data);
            }
        };

        fetchSepedaData();
    }, []);

    const lanjutKeSewa = () => {
        if (sepedaTerpilih) {
            navigation.navigate('Sewa Sepeda', { sepedaTerpilih });  // Ganti 'Sewa Motor' menjadi 'Sewa Sepeda'
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
                        onSelectSepeda={setSepedaTerpilih}  // Ganti onSelectMotor menjadi onSelectSepeda
                        sepedaDipilih={sepedaTerpilih}  // Ganti motorDipilih menjadi sepedaDipilih
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
