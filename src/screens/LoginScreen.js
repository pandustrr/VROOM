import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import ResetPasswordForm from '../components/ResetPasswordForm';

export default function LoginScreen({ navigation }) {
    const [screen, setScreen] = useState('login'); 

    const handleLoginSuccess = (user) => {
        const name = user.username || 'Pengguna'; 
        navigation.navigate('Rental Kendaraan', { userName: name });
    };

    switch (screen) {
        case 'register':
            return (
                <RegisterForm
                    onLogin={() => setScreen('login')} 
                />
            );
        case 'reset':
            return (
                <ResetPasswordForm
                    onBackToLogin={() => setScreen('login')}
                />
            );
        default:
            return (
                <LoginForm
                    navigation={navigation} 
                    onRegister={() => setScreen('register')} 
                    onResetPassword={() => setScreen('reset')} 
                    onLoginSuccess={handleLoginSuccess} 
                />
            );
    }
}
