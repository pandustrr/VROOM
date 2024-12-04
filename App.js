import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Alert } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import PilihanKendaraan from './src/penyewaan/PilihanKendaraan';
import FormPenyewaan from './src/penyewaan/FormPenyewaan';
import KonfirmasiPenyewaan from './src/penyewaan/KonfirmasiPenyewaan';

const Stack = createStackNavigator();

export default function App() {
    const handleLoginSuccess = (navigation, user) => {
        const name = user.displayName || 'Pengguna'; // Ganti dengan field username jika perlu
        Alert.alert('Login Berhasil', `Selamat datang, ${name}!`);
        navigation.navigate('PilihanKendaraan', { userName: name });
    };

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                {/* Login Screen */}
                <Stack.Screen
                    name="Login"
                    options={{ headerShown: false }}
                >
                    {({ navigation }) => (
                        <LoginScreen
                            onLoginSuccess={(user) => handleLoginSuccess(navigation, user)}
                        />
                    )}
                </Stack.Screen>

                {/* Pilihan Kendaraan */}
                <Stack.Screen
                    name="PilihanKendaraan"
                    options={{ title: 'Pilih Kendaraan' }}
                >
                    {({ navigation, route }) => (
                        <PilihanKendaraan
                            onSelect={(kendaraan) =>
                                navigation.navigate('FormPenyewaan', { kendaraan, userName: route.params.userName })
                            }
                        />
                    )}
                </Stack.Screen>

                {/* Form Penyewaan */}
                <Stack.Screen
                    name="FormPenyewaan"
                    options={({ route }) => ({
                        title: `Sewa ${route.params.kendaraan}`,
                    })}
                >
                    {({ navigation, route }) => (
                        <FormPenyewaan
                            kendaraan={route.params.kendaraan}
                            onSelesai={(detail) =>
                                navigation.navigate('KonfirmasiPenyewaan', { detail })
                            }
                        />
                    )}
                </Stack.Screen>

                {/* Konfirmasi Penyewaan */}
                <Stack.Screen
                    name="KonfirmasiPenyewaan"
                    options={{ title: 'Konfirmasi Penyewaan' }}
                >
                    {({ navigation, route }) => (
                        <KonfirmasiPenyewaan
                            detail={route.params.detail}
                            onKembali={() => navigation.navigate('PilihanKendaraan')}
                        />
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
