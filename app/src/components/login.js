import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/login_style.module.css';
import axios from 'axios';
import Logo from './header_logo';
import Popup from './popup';
import LoadingScreen from './loadingScreenComponent';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_AUTH_BASE_URL}/api/auth/sign-in`, {
        username,
        password,
      });

      localStorage.setItem('authToken', response.data.token);

      setSuccessMessage('Login successful! Redirecting to Work Chat...');
      setError('');

      setTimeout(() => {
        navigate('/workchat');
      }, 1000);
    } catch (error) {
      console.error('Erro ao realizar login', error);

      setError('Invalid credentials. Please try again.');
      setSuccessMessage('');

      setTimeout(() => {
        setError('');
      }, 1500);
      } finally {
          setIsLoading(false);
      }
    };

  return (
    <div className={`${styles.container}`}>
      <Logo />

      <div className={`${styles.login} p-4 rounded`}>
        <h2 className="mb-2 text-left text-white">Login</h2>

        <form onSubmit={handleSubmit} method="post">
          <div className="mb-4">
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-md focus:outline-none"
              placeholder="Username"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md focus:outline-none"
              placeholder="Senha"
            />
          </div>

          {successMessage && (
            <Popup message={successMessage} type="success" />
          )}
          {error && (
            <Popup message={error} type="error" />
          )}
          {!successMessage && !error && (
            isLoading ? (
              <LoadingScreen />
            ) : (
              <button type="submit" className={` ${styles.button_login} w-full py-2 px-4 rounded-md`}>
                Start
              </button>
            )
          )}
          </form>
      </div>

      <div className={`${styles.footer} mt-12`}>
        <div className={`${styles.register} flex justify-center`}>
          <p className='text-white'>
            Don't have a registration?<a href="/register" className="text-blue-500"> Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
