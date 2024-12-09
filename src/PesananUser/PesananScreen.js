import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, Image } from 'react-native';
import { ambilDataPesanan } from '../services/dbService';  // Fungsi untuk mengambil data pesanan
import { auth } from '../services/firebase'; // Import auth untuk mengambil data pengguna yang sedang login

export default function PesananScreen() {
  const [pesanan, setPesanan] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchPesanan = async () => {
      try {
        const email = auth.currentUser?.email;  // Mendapatkan email pengguna yang sedang login
        if (!email) {
          Alert.alert('Error', 'Pengguna tidak terautentikasi.');
          return;
        }

        setUserEmail(email);
        const response = await ambilDataPesanan(email);
        setPesanan(response);
      } catch (error) {
        console.error('Error mengambil pesanan:', error);
        Alert.alert('Error', 'Gagal mengambil data pesanan');
      }
    };

    fetchPesanan();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daftar Pesanan Anda</Text>
      <FlatList
        data={pesanan}
        keyExtractor={(item) => item.idPesanan.toString()}
        renderItem={({ item }) => (
          <View style={styles.pesananItem}>
            <Image
              source={{ uri: item.gambar }}
              style={styles.gambar}
            />
            <Text>ID Pesanan: {item.idPesanan}</Text>
            <Text>{item.nama}</Text>
            <Text>Harga: {item.harga}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pesananItem: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  gambar: {
    width: 100,  // Ukuran gambar disesuaikan
    height: 100, // Ukuran gambar disesuaikan
    marginBottom: 10,
    resizeMode: 'contain', // Menyesuaikan gambar agar tetap proporsional
  },
});
