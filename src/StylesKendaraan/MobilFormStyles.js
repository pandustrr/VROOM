import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    mobilContainer: {
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 16,
    },
    mobilDipilih: {
        borderColor: '#007bff', 
        borderWidth: 3,
    },
    gambarMobil: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    namaMobil: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
    },
    hargaMobil: {
        fontSize: 14,
        color: '#6c757d',
        marginTop: 4,
    },
    statusMobil: {
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
