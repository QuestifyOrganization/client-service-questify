import React, { useState, useEffect } from 'react';
import styles from '../styles/register_style.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from './header_logo';
import Popup from './popup';
import LoadingScreen from './loadingScreenComponent';
import LoginSuccess from './loginSucess';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [autoLogin, setAutoLogin] = useState(false);

  useEffect(() => {
    if (autoLogin) {
      const doAutoLogin = async () => {
        try {
          const response = await axios.post(`${process.env.REACT_APP_API_AUTH_BASE_URL}/api/auth/sign-in`, {
            username: formData.username,
            password: formData.password,
          });

          localStorage.setItem('authToken', response.data.token);

          setSuccessMessage('User created successfully! Logging in...');

          setTimeout(() => {
            navigate('/workchat');
          }, 2500);
        } catch (error) {
          console.error('Error logging in after registration', error);
          setError('Login error. Please try again.');
          setSuccessMessage('');

          setTimeout(() => {
            setError('');
          }, 2500);
        } finally {
          setIsLoading(false);
        }
      };

      doAutoLogin();
    }
  }, [autoLogin, formData.username, formData.password, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_AUTH_BASE_URL}/api/user/create`, formData);

      setSuccessMessage('User created successfully! Redirecting to login page...');
      setError('');

      setAutoLogin(true);
    } catch (error) {
      console.error('Error creating user', error);
      setError('User create error. Please try again.');
      setSuccessMessage('');

      setTimeout(() => {
        setError('');
      }, 2500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {successMessage && <LoginSuccess />} {/* Renderiza LoginSuccess se houver uma mensagem de sucesso */}

      {!successMessage && (
        <div className={`${styles.container}`}>
          <Logo />

          <div className={`${styles.login} p-4 rounded`}>
            <h2 className="mb-2 text-left text-white">Register</h2>

            <form onSubmit={handleSubmit} method="post">
              <div className="mb-4">
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md focus:outline-none"
                  placeholder="Enter your username"
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md focus:outline-none"
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md focus:outline-none"
                  placeholder="Enter your password"
                />
              </div>

              <button type="submit" className={` ${styles.button_login} w-full py-2 px-4 rounded-md`}>
                  Register
              </button>

              {error && (
                <Popup message={error} type="error" />
              )}
              {!error && isLoading && (
                <LoadingScreen />
              )}
              {!error && !isLoading && (
                <div></div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
