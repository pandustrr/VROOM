import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image } from "react-native";
import { getAuth } from "firebase/auth"; // Import Firebase Auth
import { getFirestore, collection, onSnapshot } from "firebase/firestore"; // Import Firestore untuk onSnapshot

export default function PesananForm() {
    const [pesanan, setPesanan] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            console.error("Pengguna tidak ditemukan atau belum login.");
            return;
        }

        const emailPengguna = user.email; // Ambil email dari pengguna yang sedang login
        console.log("Email pengguna:", emailPengguna);

        // Mendapatkan referensi ke koleksi pesanan pengguna di Firestore
        const db = getFirestore();
        const pesananRef = collection(db, "pesanan_saya", emailPengguna, "items");

        // Menggunakan onSnapshot untuk mendengarkan perubahan secara real-time
        const unsubscribe = onSnapshot(pesananRef, (snapshot) => {
            const pesananList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPesanan(pesananList);
            setLoading(false); // Menghentikan indikator loading setelah data diterima
        }, (error) => {
            console.error("Error saat mendengarkan perubahan data pesanan:", error.message);
            setLoading(false);
        });

        // Bersihkan listener ketika komponen dibuang (unmount)
        return () => unsubscribe();

    }, []); // Hanya dijalankan sekali saat komponen pertama kali dimuat

    // Render item dalam daftar pesanan
    const renderPesanan = ({ item }) => (
        <View style={styles.itemContainer}>
            {/* Menampilkan gambar */}
            <Image
                source={{ uri: item.gambar }}
                style={styles.itemImage}
            />
            <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{item.nama}</Text>
                <Text style={styles.itemPrice}>Harga: {item.harga}</Text>
                <Text style={[styles.itemStatus, item.status === 'tersedia' ? styles.available : styles.unavailable]}>
                    Status: {item.status}
                </Text>
            </View>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6200ea" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={pesanan}
                keyExtractor={(item, index) => `${item.id}-${index}`}  // Gabungkan id dan index untuk memastikan keunikan key
                renderItem={renderPesanan}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f7f7f7",  // Background yang lebih soft
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f7f7f7",
    },
    itemContainer: {
        flexDirection: "row",
        padding: 16,
        marginBottom: 12,
        backgroundColor: "#ffffff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        elevation: 5, // Bayangan untuk efek kedalaman
        shadowColor: "#000", // Bayangan untuk iOS
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    itemImage: {
        width: 90,
        height: 90,
        borderRadius: 12,
        marginRight: 16,
        borderWidth: 2,
        borderColor: "#ddd", // Menambahkan border pada gambar
    },
    itemDetails: {
        flex: 1,
        justifyContent: "center",
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: "600",  // Menggunakan font yang lebih tebal
        color: "#333", // Warna teks yang lebih gelap untuk kontras
        marginBottom: 6,
    },
    itemPrice: {
        fontSize: 16,
        color: "#6200ea", // Warna ungu untuk harga
        marginBottom: 4,
    },
    itemStatus: {
        fontSize: 14,
        fontWeight: "500",
    },
    available: {
        color: "#4caf50", // Warna hijau untuk status tersedia
    },
    unavailable: {
        color: "#f44336", // Warna merah untuk status tidak tersedia
    },
});
  