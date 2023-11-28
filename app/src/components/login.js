import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/login_style.module.css';
import axios from 'axios';
import logo from '../images/questify.png';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://0.0.0.0:3001/api/auth/sign-in', {
        username,
        password,
      });

      localStorage.setItem('authToken', response.data.token);
      console.log(localStorage)

      setSuccessMessage('Login successful! Redirecting to Work Chat...');
      setError('');

      setTimeout(() => {
        navigate('/workchat')
      }, 1500);
    } catch (error) {
      console.error('Erro ao realizar login', error);

      setError('Invalid credentials. Please try again.');
      setSuccessMessage('');

      setTimeout(() => {
        setError('');
      }, 1500);
    }
  };

  return (
    <div className={`${styles.container}`}>
      <img src={logo} alt="logo" className={`${styles.logo} flex justify-center`}/>

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

          {
            successMessage ? (
              <div className="mb-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-2 rounded-md">
                {successMessage}
              </div>
            ) : error ? (
              <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 rounded-md">
                {error}
              </div>
            ) : (
            <button type="submit" className={` ${styles.button_login} w-full py-2 px-4 rounded-md`}>
              Entrar
          </button>
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
