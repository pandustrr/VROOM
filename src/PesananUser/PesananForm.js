import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from "react-native";
import { getAuth } from "firebase/auth"; 
import { getFirestore, collection, onSnapshot } from "firebase/firestore"; 
import styles from '../PesananStyles/PesananFormStyles';  
import { useNavigation } from "@react-navigation/native";

export default function PesananForm() {
    const [pesanan, setPesanan] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation(); // Untuk navigasi

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            console.error("Pengguna tidak ditemukan atau belum login.");
            return;
        }

        const emailPengguna = user.email; 
        const db = getFirestore();
        const pesananRef = collection(db, "pesanan_saya", emailPengguna, "items");

        const unsubscribe = onSnapshot(pesananRef, (snapshot) => {
            const pesananList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPesanan(pesananList);
            setLoading(false); 
        }, (error) => {
            console.error("Error saat mendengarkan perubahan data pesanan:", error.message);
            setLoading(false);
        });

        return () => unsubscribe();

    }, []); 

    const renderPesanan = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate("DetailPesanan", { data: item })}
        >
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
        </TouchableOpacity>
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
                keyExtractor={(item, index) => `${item.id}-${index}`}  
                renderItem={renderPesanan}
            />
        </View>
    );
}
