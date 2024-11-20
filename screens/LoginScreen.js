import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';  
import RegisterForm from '../components/RegisterForm';  

export default function LoginScreen() {
  const [isRegister, setIsRegister] = useState(false);

  return isRegister ? (
    <RegisterForm onLogin={() => setIsRegister(false)} />
  ) : (
    <LoginForm onRegister={() => setIsRegister(true)} />
  );
}
