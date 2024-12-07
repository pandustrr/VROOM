import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import PesananScreen from './PesananScreen';
import MotorScreen from '../KendaraanScreen/MotorScreen';
import MobilScreen from '../KendaraanScreen/MobilScreen';
import SepedaScreen from '../KendaraanScreen/SepedaScreen';

const Tab = createBottomTabNavigator();

export default function PenyewaanForm() {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="Pesanan" 
                component={PesananScreen}
                options={{
                    tabBarIcon: () => <Icon name="home" size={24} color="black" />
                }} 
            />
            <Tab.Screen 
                name="Motor" 
                component={MotorScreen}
                options={{
                    tabBarIcon: () => <Icon name="motorcycle" size={24} color="black" />
                }} 
            />
            <Tab.Screen 
                name="Mobil" 
                component={MobilScreen}
                options={{
                    tabBarIcon: () => <Icon name="directions-car" size={24} color="black" />
                }} 
            />
            <Tab.Screen 
                name="Sepeda" 
                component={SepedaScreen}
                options={{
                    tabBarIcon: () => <Icon name="bike-scooter" size={24} color="black" />
                }} 
            />
        </Tab.Navigator>
    );
}
