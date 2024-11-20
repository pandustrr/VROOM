// src/App.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoginScreen from './screens/LoginScreen';  // Path yang benar

export default function App() {
  return (
    <View style={styles.container}>
      {/* Menampilkan LoginScreen sebagai tampilan utama */}
      <LoginScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
