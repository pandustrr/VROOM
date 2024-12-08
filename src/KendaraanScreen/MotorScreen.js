import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { ambilDataMotor } from '../services/dbService';
import MotorForm from '../KendaraanForm/MotorForm'; 
import { useNavigation } from '@react-navigation/native';
import styles from '../StylesKendaraan/MotorScreenStyles';


export default function MotorScreen() {
    const [motorData, setMotorData] = useState([]);
    const [motorTerpilih, setMotorTerpilih] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchMotorData = async () => {
            const data = await ambilDataMotor();
            if (data) {
                setMotorData(data);
            }
        };

        fetchMotorData();
    }, []);

    const lanjutKeSewa = () => {
        if (motorTerpilih) {
            navigation.navigate('Sewa Motor', { motorTerpilih });
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={motorData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <MotorForm
                        motor={item}
                        onSelectMotor={setMotorTerpilih}
                        motorDipilih={motorTerpilih}
                    />
                )}
            />
            {/* Tombol Pilih Motor */}
            <View style={styles.tombolContainer}>
                <TouchableOpacity
                    style={[styles.tombolPilih, motorTerpilih && styles.tombolAktif]}
                    onPress={lanjutKeSewa}
                    disabled={!motorTerpilih}
                >
                    <Text style={styles.teksTombol}>Pilih Motor</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


