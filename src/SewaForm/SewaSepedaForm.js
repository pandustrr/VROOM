import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import { ambilDataSepeda } from '../services/dbService'; // Mengimpor fungsi untuk mengambil data sepeda
import styles from '../StylesKendaraan/SewaSepedaFormStyles'; // Mengubah path ke styles sepeda

export default function SewaSepedaForm({ sepeda, onSubmit }) {
    const [sepedaData, setSepedaData] = useState(sepeda || null);
    const [loading, setLoading] = useState(!sepeda);

    useEffect(() => {
        const fetchSepedaData = async () => {
            if (!sepeda || !sepeda.gambar || !sepeda.nama) {
                setLoading(true);
                try {
                    const allSepedas = await ambilDataSepeda(); // Mengambil data sepeda
                    const selectedSepeda = allSepedas.find((item) => item.id === sepeda?.id);
                    if (selectedSepeda) {
                        setSepedaData(selectedSepeda);
                    } else {
                        console.warn('Sepeda tidak ditemukan');
                    }
                } catch (error) {
                    console.error('Error fetching sepeda data:', error.message);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchSepedaData();
    }, [sepeda]);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#007BFF" />
                <Text style={styles.title}>Memuat data sepeda...</Text>
            </View>
        );
    }

    if (!sepedaData) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Sepeda tidak ditemukan</Text>
            </View>
        );
    }

    return (
        <Formik
            initialValues={{ sepedaTerpilih: sepedaData }}
            onSubmit={() => {
                if (onSubmit && typeof onSubmit === 'function') {
                    onSubmit(sepedaData); // Mengirimkan data sepeda yang dipilih ke fungsi onSubmit
                } else {
                    console.warn('Fungsi onSubmit tidak disediakan atau bukan fungsi valid');
                }
            }}
        >
            {({ handleSubmit }) => (
                <View style={styles.container}>
                    <View style={styles.sepedaContainer}>
                        <Image source={{ uri: sepedaData.gambar }} style={styles.image} />
                        <Text style={styles.nama}>{sepedaData.nama}</Text>
                        <Text style={styles.harga}>Rp {sepedaData.harga}/hari</Text>
                        <Text
                            style={[
                                styles.status,
                                sepedaData.status === 'tersedia' ? styles.tersedia : styles.tidakTersedia,
                            ]}
                        >
                            {sepedaData.status === 'tersedia' ? 'Tersedia' : 'Tidak Tersedia'}
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
