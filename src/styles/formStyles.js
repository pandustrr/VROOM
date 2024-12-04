import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // Styles umum untuk semua form
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9', // Warna latar belakang yang seragam
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff', // Warna latar input
    },
    judul: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    link: {
        color: '#007bff',
        marginTop: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    message: {
        color: 'red',
        textAlign: 'center',
        marginVertical: 10,
    },

    // Styles khusus untuk LoginForm
    loginTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center', // Judul untuk halaman login
    },
    loginButton: {
        backgroundColor: '#4CAF50', // Warna tombol login
        borderRadius: 5,
        paddingVertical: 10,
    },
    registerText: {
        textAlign: 'center',
        marginTop: 15,
        color: '#555',
        fontSize: 14, // Teks deskripsi untuk daftar atau reset
    },
    registerLink: {
        color: '#4CAF50',
        fontWeight: 'bold', // Link untuk daftar atau reset di login
    },

    // Styles khusus untuk RegisterForm
    registerButton: {
        backgroundColor: '#2196F3', // Warna tombol daftar
        borderRadius: 5,
        paddingVertical: 10,
    },
    backButton: {
        backgroundColor: '#f44336', // Warna tombol kembali
        borderRadius: 5,
        paddingVertical: 10,
        marginTop: 10,
    },

    // Styles khusus untuk ResetPasswordForm
    resetTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center', // Judul untuk halaman reset password
    },
    resetButton: {
        backgroundColor: '#FFA726', // Warna tombol reset password
        borderRadius: 5,
        paddingVertical: 10,
    },
});

export default styles;
