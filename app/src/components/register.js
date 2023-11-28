import React, { useState, useEffect } from 'react';
import styles from '../styles/register_style.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../images/questify.png';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_AUTH_BASE_URL}/api/user/create`, formData);

      setSuccessMessage('Registro realizado com sucesso! Redirecionando para a página de login...');

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Erro ao criar usuário', error);
      setError('Erro ao criar usuário. Por favor, tente novamente.');
    }
  };

  return (
    <div className={`${styles.container}`}>

      <img src={logo} alt="logo" className={`${styles.logo} flex justify-center`}/>

      <div className={`${styles.login} p-4 rounded`}>
        <h2 className="mb-2 text-left text-white">Register</h2>

        {successMessage ? (
          <div className="mb-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-6 rounded-md">
            {successMessage}
          </div>
        ) : error ? (
            <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-2 rounded-md">
              {error}
            </div>
          ) : (
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
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
