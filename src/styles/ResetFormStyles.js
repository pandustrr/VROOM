import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
// Styles khusus untuk ResetPasswordForm
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
link: {
    color: '#007bff',
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
},

});

export default styles;

