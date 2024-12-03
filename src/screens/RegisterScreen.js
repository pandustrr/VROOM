import React, { useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';

export default function RegisterScreen() {
    const [screen, setScreen] = useState('register');

    switch (screen) {
        case 'login':
            return <LoginForm onRegister={() => setScreen('register')} />;
        default:
            return <RegisterForm onLogin={() => setScreen('login')} />;
    }
}
