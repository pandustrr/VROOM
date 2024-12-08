import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    motorContainer: {
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 16,
    },
    motorDipilih: {
        borderColor: '#007bff', // Highlight dengan border biru ketika dipilih
        borderWidth: 3,
    },
    gambarMotor: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    namaMotor: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
    },
    hargaMotor: {
        fontSize: 14,
        color: '#6c757d',
        marginTop: 4,
    },
    statusMotor: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 8,
    },
    tersedia: {
        color: 'green',
    },
    tidakTersedia: {
        color: 'red',
    },
});

export default styles;