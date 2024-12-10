import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Formik } from 'formik';
import { ambilDataMotor } from '../services/dbService';  // Pastikan ambilDataMotor ada di dbService
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styles from '../StylesKendaraan/SewaMotorFormStyles';

export default function SewaMotorForm({ motor, onSubmit }) {
    const [motorData, setMotorData] = useState(motor || null);
    const [loading, setLoading] = useState(!motor);
    const [totalHarga, setTotalHarga] = useState(0);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const fetchMotorData = async () => {
            if (!motor || !motor.gambar || !motor.nama) {
                setLoading(true);
                try {
                    const allMotors = await ambilDataMotor();  // Pastikan Anda memiliki fungsi ini untuk mengambil data motor
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
        <KeyboardAvoidingView
            behavior="padding"  
            style={styles.container}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Formik
                    initialValues={{ 
                        motorTerpilih: motorData, 
                        namaPenyewa: '', 
                        tanggalPemesanan: '', 
                        hariPenyewaan: '', 
                        totalHarga: 0 
                    }}
                    onSubmit={(values) => {
                        if (onSubmit && typeof onSubmit === 'function') {
                            onSubmit(values); // Mengirimkan semua data penyewa dan motor ke fungsi onSubmit
                        } else {
                            console.warn('Fungsi onSubmit tidak disediakan atau bukan fungsi valid');
                        }
                    }}
                >
                    {({ handleSubmit, setFieldValue, values }) => (
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
                                    setFieldValue('totalHarga', hari * motorData.harga); // Menghitung total harga
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
