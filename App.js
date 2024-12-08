import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Impor layar yang digunakan
import LoginScreen from './src/screens/LoginScreen';
import TampilanAwalScreen from './src/components/TampilanAwalScreen';
import MobilScreen from './src/KendaraanScreen/MobilScreen';
import SewaMobilScreen from './src/SewaScreen/SewaMobilScreen';
import MotorScreen from './src/KendaraanScreen/MotorScreen';
import SewaMotorScreen from './src/SewaScreen/SewaMotorScreen';
import SepedaScreen from './src/KendaraanScreen/SepedaScreen';
import SewaSepedaScreen from './src/SewaScreen/SewaSepedaScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                {/* Layar Login */}
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                {/* Tampilan Awal */}
                <Stack.Screen
                    name="Rental Kendaraan"
                    component={TampilanAwalScreen}
                    options={{ title: 'Rental Kendaraan' }}
                />
                {/* Daftar Motor */}
                <Stack.Screen
                    name="Daftar Motor"
                    component={MotorScreen}
                    options={{ title: 'Daftar Motor' }}
                />
                {/* Form Penyewaan Motor */}
                <Stack.Screen
                    name="Sewa Motor"
                    component={SewaMotorScreen}
                    options={{ title: 'Sewa Motor' }}
                />
                {/* Daftar Mobil */}
                <Stack.Screen
                    name="Daftar Mobil"
                    component={MobilScreen}
                    options={{ title: 'Daftar Mobil' }}
                />
                {/* Form Penyewaan Mobil */}
                <Stack.Screen
                    name="Sewa Mobil"
                    component={SewaMobilScreen}
                    options={{ title: 'Sewa Mobil' }}
                />
                {/* Daftar Sepeda */}
                <Stack.Screen
                    name="Daftar Sepeda"
                    component={SepedaScreen}
                    options={{ title: 'Daftar Sepeda' }}
                />
                {/* Form Penyewaan Sepeda */}
                <Stack.Screen
                    name="Sewa Sepeda"
                    component={SewaSepedaScreen}
                    options={{ title: 'Sewa Sepeda' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
