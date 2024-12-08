    import React, { useEffect, useState } from 'react';
    import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
    import { Formik } from 'formik';
    import { ambilDataMobil } from '../services/dbService';
    import styles from '../StylesKendaraan/SewaMobilFormStyles';

    export default function SewaMobilForm({ mobil, onSubmit }) {
        const [mobilData, setMobilData] = useState(mobil || null);
        const [loading, setLoading] = useState(!mobil);

        useEffect(() => {
            const fetchMobilData = async () => {
                if (!mobil || !mobil.gambar || !mobil.nama) {
                    setLoading(true);
                    try {
                        const allMobils = await ambilDataMobil();
                        const selectedMobil = allMobils.find((item) => item.id === mobil?.id);
                        if (selectedMobil) {
                            setMobilData(selectedMobil);
                        } else {
                            console.warn('Mobil tidak ditemukan');
                        }
                    } catch (error) {
                        console.error('Error fetching mobil data:', error.message);
                    } finally {
                        setLoading(false);
                    }
                }
            };

            fetchMobilData();
        }, [mobil]);

        if (loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#007BFF" />
                    <Text style={styles.title}>Memuat data mobil...</Text>
                </View>
            );
        }

        if (!mobilData) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Mobil tidak ditemukan</Text>
                </View>
            );
        }

        return (
            <Formik
                initialValues={{ mobilTerpilih: mobilData }}
                onSubmit={() => {
                    if (onSubmit && typeof onSubmit === 'function') {
                        onSubmit(mobilData); // Mengirimkan data mobil yang dipilih ke fungsi onSubmit
                    } else {
                        console.warn('Fungsi onSubmit tidak disediakan atau bukan fungsi valid');
                    }
                }}
            >
                {({ handleSubmit }) => (
                    <View style={styles.container}>
                        <View style={styles.mobilContainer}>
                            <Image source={{ uri: mobilData.gambar }} style={styles.image} />
                            <Text style={styles.nama}>{mobilData.nama}</Text>
                            <Text style={styles.harga}>Rp {mobilData.harga}/hari</Text>
                            <Text
                                style={[
                                    styles.status,
                                    mobilData.status === 'tersedia' ? styles.tersedia : styles.tidakTersedia,
                                ]}
                            >
                                {mobilData.status === 'tersedia' ? 'Tersedia' : 'Tidak Tersedia'}
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
