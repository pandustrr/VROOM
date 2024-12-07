import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/MotorFormStyles';

export default function MotorForm({ motor, onSelectMotor, motorDipilih }) {
    return (
        <TouchableOpacity
            onPress={() => onSelectMotor(motor)}
            style={[
                styles.motorContainer,
                motorDipilih && motorDipilih.id === motor.id && styles.motorDipilih, 
            ]}
        >
            <Image source={{ uri: motor.gambar }} style={styles.gambarMotor} />
            <Text style={styles.namaMotor}>{motor.nama}</Text>
            <Text style={styles.hargaMotor}>Rp {motor.harga}/hari</Text>
            <Text
                style={[
                    styles.statusMotor,
                    motor.status === 'tersedia' ? styles.tersedia : styles.tidakTersedia,
                ]}
            >
                {motor.status === 'tersedia' ? 'Tersedia' : 'Tidak Tersedia'}
            </Text>
        </TouchableOpacity>
    );
}


