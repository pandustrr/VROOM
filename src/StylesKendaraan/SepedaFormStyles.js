import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    sepedaContainer: {
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 16,
    },
    sepedaDipilih: {
        borderColor: '#007bff', 
        borderWidth: 3,
    },
    gambarSepeda: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    namaSepeda: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
    },
    hargaSepeda: {
        fontSize: 14,
        color: '#6c757d',
        marginTop: 4,
    },
    statusSepeda: {
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
