import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
},

input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff', 
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
    textAlign: 'center',
},
resetButton: {
    backgroundColor: '#FFA726', 
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

