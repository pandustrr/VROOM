import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    motorContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    nama: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 8,
    },
    harga: {
        fontSize: 16,
        color: '#6c757d',
        marginTop: 4,
    },
    status: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
    },
    tersedia: {
        color: 'green',
    },
    tidakTersedia: {
        color: 'red',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;