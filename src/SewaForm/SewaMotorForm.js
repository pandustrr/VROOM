import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import { ambilDataMotor } from '../services/dbService'; // Mengimpor fungsi untuk mengambil data motor
import styles from '../StylesKendaraan/SewaMotorFormStyles'; // Mengubah path ke styles motor

export default function SewaMotorForm({ motor, onSubmit }) {
    const [motorData, setMotorData] = useState(motor || null);
    const [loading, setLoading] = useState(!motor);

    useEffect(() => {
        const fetchMotorData = async () => {
            if (!motor || !motor.gambar || !motor.nama) {
                setLoading(true);
                try {
                    const allMotors = await ambilDataMotor(); // Mengambil data motor
                    const selectedMotor = allMotors.find((item) => item.id === motor?.id);
                    if (selectedMotor) {
                        setMotorData(selectedMotor);
                    } else {
                        console.warn('Motor tidak ditemukan');
                    }
                } catch (error) {
                    console.error('Error fetching motor data:', error.message);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchMotorData();
    }, [motor]);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#007BFF" />
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
            onSubmit={() => {
                if (onSubmit && typeof onSubmit === 'function') {
                    onSubmit(motorData); // Mengirimkan data motor yang dipilih ke fungsi onSubmit
                } else {
                    console.warn('Fungsi onSubmit tidak disediakan atau bukan fungsi valid');
                }
            }}
        >
            {({ handleSubmit }) => (
                <View style={styles.container}>
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
