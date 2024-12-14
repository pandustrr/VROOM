import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },

    loginTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center', 
    },
    loginButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        paddingVertical: 10,
    },
    registerText: {
        textAlign: 'center',
        marginTop: 15,
        color: '#555',
        fontSize: 14, 
    },
    registerLink: {
        color: '#4CAF50',
        fontWeight: 'bold',
    },

});

export default styles;