import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f7fb', 
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 40,
    },
    sepedaContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 24,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
        marginBottom: 25,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 15,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    nama: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
        textAlign: 'center',
    },
    harga: {
        fontSize: 20,
        color: '#6c757d',
        marginTop: 8,
    },
    status: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15,
        textAlign: 'center',
    },
    tersedia: {
        color: 'green',
    },
    tidakTersedia: {
        color: 'red',
    },
    input: {
        height: 55,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 12,
        marginBottom: 18,
        paddingLeft: 15,
        fontSize: 18,
        backgroundColor: '#f9f9f9',
        justifyContent: 'center', 
    },
    totalHarga: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 15,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 16,
        paddingHorizontal: 40,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 35,
        elevation: 3,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default styles;
