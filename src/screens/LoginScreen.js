import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import ResetPasswordForm from '../components/ResetPasswordForm';
import FormPenyewaan from '../penyewaan/FormPenyewaan';

export default function LoginScreen() {
    const [screen, setScreen] = useState('login');

    switch (screen) {
        case 'register':
            return <RegisterForm onLogin={() => setScreen('login')} />;
        case 'reset':
            return <ResetPasswordForm onBackToLogin={() => setScreen('login')} />;
        default:
            return <LoginForm onRegister={() => setScreen('register')} onResetPassword={() => setScreen('reset')} />;
    }
}
