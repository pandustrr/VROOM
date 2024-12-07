import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import TampilanAwalScreen from './src/Fitur_Sewa/TampilanAwalScreen';
import SewaScreen from './src/SewaScreen/SewaMotorScreen'; 

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Rental Kendaraan"
                    component={TampilanAwalScreen}
                    options={{ headerShown: true }}
                />
                <Stack.Screen
                    name="Sewa Motor"
                    component={SewaScreen}  // Tambahkan rute untuk SewaScreen
                    options={{ headerShown: true }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
