import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginSuccess = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('Login successful! Redirecting to Work Chat...');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessage('Redirecting to Work Chat...');
    }, 1000);

    const redirectTimeout = setTimeout(() => {
      navigate('/workchat');
    }, 3000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(redirectTimeout);
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

export default LoginSuccess;
