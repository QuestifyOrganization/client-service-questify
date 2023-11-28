// Logout.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('Logging out...');

  useEffect(() => {
    // Atualiza a mensagem após 1 segundo
    const timeout = setTimeout(() => {
      setMessage('Redirecting to login...');
    }, 1000);

    // Limpar o token ao fazer logout
    const logoutTimeout = setTimeout(() => {
      localStorage.removeItem('authToken');
      navigate('/');
    }, 3000); // Tempo desejado antes de redirecionar

    // Limpa os timeouts ao desmontar o componente
    return () => {
      clearTimeout(timeout);
      clearTimeout(logoutTimeout);
    };
  }, [navigate]);

  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                  bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md
                  shadow-md"
    >
      {message}
    </div>
  );
};

export default Logout;
