import React, { useState } from 'react';
import ResetPasswordForm from '../components/ResetPasswordForm';
import LoginForm from '../components/LoginForm';

export default function ResetPasswordScreen() {
    const [screen, setScreen] = useState('reset');

    switch (screen) {
        case 'login':
            return <LoginForm onResetPassword={() => setScreen('reset')} />;
        default:
            return <ResetPasswordForm onBackToLogin={() => setScreen('login')} />;
    }
}
