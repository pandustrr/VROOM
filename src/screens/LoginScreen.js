import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import ResetPasswordForm from '../components/ResetPasswordForm';

export default function LoginScreen({ navigation }) {
    const [screen, setScreen] = useState('login'); 

    // Fungsi untuk menangani login sukses
    const handleLoginSuccess = (user) => {
        const name = user.username || 'Pengguna'; 
        navigation.navigate('Rental Kendaraan', { userName: name });
    };

    switch (screen) {
        case 'register':
            return (
                <RegisterForm
                    onLogin={() => setScreen('login')} // Kembali ke layar login
                />
            );
        case 'reset':
            return (
                <ResetPasswordForm
                    onBackToLogin={() => setScreen('login')} // Kembali ke layar login
                />
            );
        default:
            return (
                <LoginForm
                    navigation={navigation} // Menyertakan navigation ke LoginForm
                    onRegister={() => setScreen('register')} // Pindah ke layar registrasi
                    onResetPassword={() => setScreen('reset')} // Pindah ke layar reset password
                    onLoginSuccess={handleLoginSuccess} // Mengirimkan handleLoginSuccess ke LoginForm
                />
            );
    }
}
