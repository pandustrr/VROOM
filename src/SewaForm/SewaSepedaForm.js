import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { ambilDataSepeda } from '../services/dbService';  // Ganti untuk mengambil data sepeda
import styles from '../StylesKendaraan/SewaSepedaFormStyles'; // Ganti dengan gaya untuk sepeda

export default function SewaForm({ sepeda }) {
    const [sepedaData, setSepedaData] = useState(sepeda);  // Gunakan sepeda, bukan motor
    const [loading, setLoading] = useState(!sepeda); // Mengatur status loading jika sepeda tidak ada

    useEffect(() => {
        const fetchSepedaData = async () => {
            if (!sepeda || !sepeda.gambar || !sepeda.nama) {
                setLoading(true); // Menampilkan loading jika data sepeda tidak lengkap
                try {
                    const allSepeda = await ambilDataSepeda(); // Ambil semua data sepeda dari Firebase
                    const selectedSepeda = allSepeda.find(item => item.id === sepeda?.id); // Cari sepeda berdasarkan ID
                    if (selectedSepeda) {
                        setSepedaData(selectedSepeda); // Set data sepeda yang ditemukan
                    } else {
                        console.warn('Sepeda tidak ditemukan');
                    }
                } catch (error) {
                    console.error('Error fetching sepeda data:', error.message);
                } finally {
                    setLoading(true); 
                }
            }
        };

        fetchSepedaData();
    }, [sepeda]);

    if (loading) {
        return (
            <View style={styles.container}>
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
            onSubmit={(values) => {
                console.log('Sepeda yang disewa:', values.sepedaTerpilih);
                alert('Sepeda berhasil disewa');
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
