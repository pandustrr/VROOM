import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import PesananForm from "./PesananForm";

export default function PesananScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <PesananForm />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
});
