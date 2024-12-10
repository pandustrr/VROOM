import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Formik } from 'formik';
import { ambilDataMobil } from '../services/dbService';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styles from '../StylesKendaraan/SewaMobilFormStyles';

export default function SewaMobilForm({ mobil, onSubmit }) {
    const [mobilData, setMobilData] = useState(mobil || null);
    const [loading, setLoading] = useState(!mobil);
    const [totalHarga, setTotalHarga] = useState(0);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

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

    const handleDateConfirm = (date) => {
        setSelectedDate(date);
        setDatePickerVisibility(false);
    };

    // Mendapatkan tanggal sekarang
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split('T')[0];  // Format YYYY-MM-DD

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
        <KeyboardAvoidingView
            behavior="padding"  
            style={styles.container}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Formik
                    initialValues={{ 
                        mobilTerpilih: mobilData, 
                        namaPenyewa: '', 
                        tanggalPemesanan: '', 
                        hariPenyewaan: '', 
                        totalHarga: 0 
                    }}
                    onSubmit={(values) => {
                        if (onSubmit && typeof onSubmit === 'function') {
                            onSubmit(values); // Mengirimkan semua data penyewa dan mobil ke fungsi onSubmit
                        } else {
                            console.warn('Fungsi onSubmit tidak disediakan atau bukan fungsi valid');
                        }
                    }}
                >
                    {({ handleSubmit, setFieldValue, values }) => (
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

                            {/* Form Input untuk Nama Penyewa */}
                            <TextInput
                                style={styles.input}
                                placeholder="Nama Penyewa"
                                value={values.namaPenyewa}
                                onChangeText={(text) => setFieldValue('namaPenyewa', text)}
                            />

                            {/* Tombol untuk Memilih Tanggal Pemesanan */}
                            <TouchableOpacity 
                                style={[styles.input, { justifyContent: 'center', paddingLeft: 15 }]} 
                                onPress={() => setDatePickerVisibility(true)}
                            >
                                <Text style={{ color: selectedDate ? '#000' : '#999', fontSize: 18 }}>
                                    {selectedDate ? selectedDate.toLocaleDateString() : 'Pilih Tanggal Pemesanan'}
                                </Text>
                            </TouchableOpacity>



                            {/* Form Input untuk Jumlah Hari Penyewaan */}
                            <TextInput
                                style={styles.input}
                                placeholder="Berapa hari dipesan"
                                keyboardType="numeric"
                                value={values.hariPenyewaan}
                                onChangeText={(text) => {
                                    const hari = parseInt(text, 10) || 0;
                                    setFieldValue('hariPenyewaan', text);
                                    setFieldValue('totalHarga', hari * mobilData.harga); // Menghitung total harga
                                }}
                            />

                            {/* Tampilkan Total Harga */}
                            <Text style={styles.totalHarga}>
                                Total Harga: Rp {values.totalHarga}
                            </Text>

                            {/* Tombol Konfirmasi Penyewaan */}
                            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                <Text style={styles.buttonText}>Konfirmasi Penyewaan</Text>
                            </TouchableOpacity>

                            {/* Modal untuk Memilih Tanggal */}
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleDateConfirm}
                                onCancel={() => setDatePickerVisibility(false)}
                                minimumDate={currentDate}  // Membatasi tanggal pemesanan agar tidak bisa memilih tanggal lampau
                            />
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
