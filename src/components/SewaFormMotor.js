import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { ambilDataMotor } from '../services/dbService';
import styles from '../styles/SewaFormMotorStyles';

export default function SewaForm({ motor }) {
    const [motorData, setMotorData] = useState(motor); 
    const [loading, setLoading] = useState(!motor); 

    useEffect(() => {
        const fetchMotorData = async () => {
            if (!motor || !motor.gambar || !motor.nama) {
                setLoading(true); // Tampilkan loading jika data motor tidak lengkap
                try {
                    const allMotors = await ambilDataMotor(); // Ambil semua data motor dari Firebase
                    const selectedMotor = allMotors.find(item => item.id === motor?.id); // Cari motor berdasarkan ID
                    if (selectedMotor) {
                        setMotorData(selectedMotor); // Setel data motor yang ditemukan
                    } else {
                        console.warn('Motor tidak ditemukan');
                    }
                } catch (error) {
                    console.error('Error fetching motor data:', error.message);
                } finally {
                    setLoading(false); // Sembunyikan loading
                }
            }
        };

        fetchMotorData();
    }, [motor]);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Memuat data motor...</Text>
            </View>
        );
    }

    if (!motorData) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Motor tidak ditemukan</Text>
            </View>
        );
    }

    return (
        <Formik
            initialValues={{ motorTerpilih: motorData }}
            onSubmit={(values) => {
                console.log('Motor yang disewa:', values.motorTerpilih);
                alert('Motor berhasil disewa');
            }}
        >
            {({ handleSubmit }) => (
                <View style={styles.container}>
                    <Text style={styles.title}>Form Penyewaan</Text>
                    <View style={styles.motorContainer}>
                        <Image source={{ uri: motorData.gambar }} style={styles.image} />
                        <Text style={styles.nama}>{motorData.nama}</Text>
                        <Text style={styles.harga}>Rp {motorData.harga}/hari</Text>
                        <Text
                            style={[
                                styles.status,
                                motorData.status === 'tersedia' ? styles.tersedia : styles.tidakTersedia,
                            ]}
                        >
                            {motorData.status === 'tersedia' ? 'Tersedia' : 'Tidak Tersedia'}
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Konfirmasi Penyewaan</Text>
                    </TouchableOpacity>
                </View>
            )}
        </Formik>
    );
}


