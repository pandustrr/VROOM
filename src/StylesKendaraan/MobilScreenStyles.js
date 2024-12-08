import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    tombolContainer: {
        padding: 16,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    tombolPilih: {
        backgroundColor: '#6c757d',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    tombolAktif: {
        backgroundColor: '#007bff',
    },
    teksTombol: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;
