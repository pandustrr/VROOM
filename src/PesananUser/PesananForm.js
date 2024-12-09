import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { simpanDataPesananMobil, simpanDataPesananMotor, simpanDataPesananSepeda } from '../services/dbService'; // Impor fungsi untuk menyimpan pesanan
import { auth } from '../services/firebase';  // Impor auth untuk mendapatkan data pengguna yang sedang login

export default function PesananForm({ route }) {
  const [email, setEmail] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [pesanan, setPesanan] = useState({
    gambar: '',
    harga: 0,
    id: '',
    nama: '',
    status: '',
  });

  const navigation = useNavigation();

  useEffect(() => {
    // Ambil email pengguna yang sedang login
    const userEmail = auth.currentUser?.email;
    if (!userEmail) {
      Alert.alert('Error', 'Pengguna tidak terautentikasi');
      return;
    }
    setEmail(userEmail);

    // Ambil data kendaraan yang dipilih dari parameter route
    if (route.params) {
      const { item } = route.params;
      setSelectedItem(item);
      setPesanan({
        gambar: item.gambar || '', // Pastikan gambar tidak kosong
        harga: item.harga,
        id: item.id,
        nama: item.nama,
        status: item.status,
      });
    }
  }, [route.params]);

  const handlePesan = async () => {
    if (!pesanan.id || !pesanan.nama) {
      Alert.alert('Error', 'Pilih kendaraan untuk dipesan!');
      return;
    }

    try {
      // Menyimpan data pesanan berdasarkan kategori kendaraan
      if (selectedItem.status === 'mobil') {
        await simpanDataPesananMobil(pesanan, email);
      } else if (selectedItem.status === 'motor') {
        await simpanDataPesananMotor(pesanan, email);
      } else if (selectedItem.status === 'sepeda') {
        await simpanDataPesananSepeda(pesanan, email);
      } else {
        throw new Error('Jenis kendaraan tidak valid');
      }

      Alert.alert('Berhasil', `Pesanan ${pesanan.nama} berhasil disimpan!`);
      navigation.goBack();  // Kembali ke halaman sebelumnya setelah pesanan disimpan
    } catch (error) {
      console.error('Error menyimpan pesanan:', error);
      Alert.alert('Error', 'Gagal menyimpan pesanan. Silakan coba lagi.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Form Pesanan</Text>

      <View style={styles.pesananDetail}>
        {/* Periksa jika gambar kosong, jika iya tampilkan placeholder */}
        {pesanan.gambar ? (
          <Image source={{ uri: pesanan.gambar }} style={styles.gambar} />
        ) : (
          <Image source={{ uri: 'https://via.placeholder.com/200' }} style={styles.gambar} />
        )}
        <Text style={styles.nama}>{pesanan.nama}</Text>
        <Text>Harga: Rp {pesanan.harga}</Text>
        <Text>Status: {pesanan.status === 'tersedia' ? 'Tersedia' : 'Tidak Tersedia'}</Text>
      </View>

      {pesanan.status === 'tersedia' ? (
        <Button title="Pesan Sekarang" onPress={handlePesan} />
      ) : (
        <Text style={styles.notAvailable}>Kendaraan ini tidak tersedia untuk disewa.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pesananDetail: {
    marginBottom: 20,
    alignItems: 'center',
  },
  gambar: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  nama: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  notAvailable: {
    color: 'red',
    marginTop: 10,
  },
});
