import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../services/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';

export default function PesananForm() {
    const [pesananList, setPesananList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            console.error('Pengguna tidak terautentikasi.');
            setLoading(false);
            return;
        }

        const pesananRef = collection(db, 'pesanan');
        const q = query(
            pesananRef,
            where('email', '==', currentUser.email),
            orderBy('tanggalPemesanan', 'desc') // Urutkan berdasarkan tanggal terbaru
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const pesananData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setPesananList(pesananData);
            setLoading(false);
        });

        return () => unsubscribe(); // Membersihkan listener saat komponen unmount
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
                <Text style={styles.loadingText}>Memuat pesanan...</Text>
            </View>
        );
    }

    if (pesananList.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Tidak ada pesanan yang ditemukan.</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={pesananList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.pesananContainer}
                    onPress={() => navigation.navigate('DetailPesanan', { data: item })}
                >
                    <Text style={styles.pesananHeader}>
                        Tanggal Pemesanan: {item.tanggalPemesanan}
                    </Text>
                    {item.items.map((detail, index) => (
                        <View style={styles.card} key={index}>
                            <Image source={{ uri: detail.gambar }} style={styles.image} />
                            <View style={styles.infoContainer}>
                                <Text style={styles.harga}>Rp {detail.harga}</Text>
                                <Text style={styles.status}>{detail.status}</Text>
                            </View>
                        </View>
                    ))}
                    <Text style={styles.pembayaran}>
                        Status Pembayaran: {item.statusPembayaran}
                    </Text>
                </TouchableOpacity>
            )}
        />
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#6c757d',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
    emptyText: {
        fontSize: 18,
        color: '#6c757d',
    },
    pesananContainer: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        elevation: 2,
    },
    pesananHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 16,
    },
    infoContainer: {
        flex: 1,
    },
    harga: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    status: {
        marginTop: 4,
        fontSize: 14,
        color: '#6c757d',
    },
    pembayaran: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#007BFF',
    },
});
