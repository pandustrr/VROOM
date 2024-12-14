import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Formik } from 'formik';
import { ambilDataSepeda } from '../services/dbService'; 
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styles from '../StylesKendaraan/SewaSepedaFormStyles';

export default function SewaSepedaForm({ sepeda, onSubmit }) {
    const [sepedaData, setSepedaData] = useState(sepeda || null);
    const [loading, setLoading] = useState(!sepeda);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const fetchSepedaData = async () => {
            if (!sepeda || !sepeda.gambar || !sepeda.nama) {
                setLoading(true);
                try {
                    const allSepedas = await ambilDataSepeda();
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

    const handleDateConfirm = (date) => {
        setSelectedDate(date);
        setDatePickerVisibility(false);
    };

    const currentDate = new Date();

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
        <KeyboardAvoidingView
            behavior="padding"
            style={styles.container}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Formik
                    initialValues={{ 
                        namaPenyewa: '', 
                        tanggalPemesanan: '', 
                        hariPenyewaan: '', 
                    }}
                    onSubmit={(values) => {
                        if (onSubmit && typeof onSubmit === 'function') {
                            const formattedDate = selectedDate ? selectedDate.toISOString().split('T')[0] : '';
                            const totalHarga = (parseInt(values.hariPenyewaan, 10) || 0) * sepedaData.harga;

                            onSubmit({
                                namaPenyewa: values.namaPenyewa,
                                tanggalPemesanan: formattedDate,
                                hariPenyewaan: parseInt(values.hariPenyewaan, 10) || 0,
                                totalHarga,
                                items: [
                                    {
                                        id: sepedaData.id,
                                        nama: sepedaData.nama,
                                        gambar: sepedaData.gambar,
                                        harga: sepedaData.harga,
                                        status: sepedaData.status,
                                        hariPenyewaan: parseInt(values.hariPenyewaan, 10) || 0,
                                        totalHarga,
                                    },
                                ],
                            });
                        } else {
                            console.warn('Fungsi onSubmit tidak disediakan atau bukan fungsi valid');
                        }
                    }}
                >
                    {({ handleSubmit, setFieldValue, values }) => (
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

                            <TextInput
                                style={styles.input}
                                placeholder="Nama Penyewa"
                                value={values.namaPenyewa}
                                onChangeText={(text) => setFieldValue('namaPenyewa', text)}
                            />

                            <TouchableOpacity 
                                style={[styles.input, { justifyContent: 'center', paddingLeft: 15 }]} 
                                onPress={() => setDatePickerVisibility(true)}
                            >
                                <Text style={{ color: selectedDate ? '#000' : '#999', fontSize: 18 }}>
                                    {selectedDate ? selectedDate.toLocaleDateString() : 'Pilih Tanggal Pemesanan'}
                                </Text>
                            </TouchableOpacity>

                            <TextInput
                                style={styles.input}
                                placeholder="Berapa hari dipesan"
                                keyboardType="numeric"
                                value={values.hariPenyewaan}
                                onChangeText={(text) => {
                                    setFieldValue('hariPenyewaan', text);
                                }}
                            />

                            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                <Text style={styles.buttonText}>Konfirmasi Penyewaan</Text>
                            </TouchableOpacity>

                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleDateConfirm}
                                onCancel={() => setDatePickerVisibility(false)}
                                minimumDate={currentDate}
                            />
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
